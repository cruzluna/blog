---
title: "Setting Up Integration Tests with Docker & Go"
publishDate: "1 November 2023"
description: "Setting up integration tests with DockerTest and a Postgres instance."
coverImage:
  src: "./godocker-1.png"
  alt: "Go Docker Cover Image "
tags: ["Go", "Integration Testing", "Docker"]
---

## Tldr

I will go through how I spin up a docker container to set up some simple integration tests
to ensure my queries actually work, without having to resort to refreshing the Neon DB console.

## Using some markdown elements

Helper function to spin up a test database in a Docker container.

```go
func StartTestDatabase(tb testing.TB) {
	tb.Helper()

	dsn := &url.URL{
		Scheme: "postgres",
		User:   url.UserPassword("username", "password"),
		Path:   "neondb",
	}

	q := dsn.Query()
	q.Add("sslmode", "disable")
	dsn.RawQuery = q.Encode()

	pool, err := dockertest.NewPool("")
	if err != nil {
		tb.Fatalf("Could not connect to Docker: %s", err)
	}

	// docker + pool is configured at this point
	pw, _ := dsn.User.Password()
	env := []string{
		fmt.Sprintf("POSTGRES_USER=%s", dsn.User.Username()),
		fmt.Sprintf("POSTGRES_PASSWORD=%s", pw),
		fmt.Sprintf("POSTGRES_DB=%s", dsn.Path),
	}

	resource, err := pool.Run("postgres", "13-alpine", env)
	if err != nil {
		tb.Fatalf("Could not start postgres container: %v", err)
	}
	tb.Cleanup(func() {
		err = pool.Purge(resource)
		if err != nil {
			tb.Fatalf("Could not purge container: %v", err)
		}
	})
	// ----------------

	_ = resource.Expire(60)

	// MacOS specific
	if runtime.GOOS == "darwin" {
		dsn.Host = net.JoinHostPort(resource.GetBoundIP("5432/tcp"), resource.GetPort("5432/tcp"))
	}

	ctx := context.Background()

	var db *pgx.Conn
	// gets around DB reconnect fail
	// https://github.com/lib/pq/issues/835
	for i := 0; i < 20; i++ {
		db, err = pgx.Connect(ctx, dsn.String())
		if err == nil {
			break
		}

		time.Sleep(500 * time.Millisecond)
	}

	if db == nil {
		tb.Fatalf("Couldn't connect to database: %s", err)
	}

	defer db.Close(ctx)

	if err = pool.Retry(func() (err error) {
		return db.Ping(ctx)
	}); err != nil {
		tb.Fatalf("Couldn't ping DB: %s", err)
	}

	// migrate table in docker
	m, err := migrate.New(
		"file://migrations",
		dsn.String())
	if err != nil {
		tb.Fatal(err)
	}
	if err := m.Up(); err != nil {
		tb.Fatal(err)
	}

  // unique to my initialization
	err = Init(ctx, dsn.String())

	if err != nil {
		tb.Fatal("Unable to initialize singleton db connection: ", err)
	}
}
```
