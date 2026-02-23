export const GET = () => {
	const content = `name: Cruz Luna
website:
social_networks:
  - network: LinkedIn
    link: https://www.linkedin.com/in/cruzluna
  - network: GitHub
    link: https://github.com/cruzluna
sections:
  education:
    - institution: University of Nevada, Las Vegas
      area: Mechanical Engineering, Minor in Computer Science
      degree: BS
      grade:
      date:
      start_date: 2019-08
      end_date: 2023-12
      location: Las Vegas, NV
      summary:
      highlights:
        - "Overall GPA: 3.96/4.0"
        - "Dean's List"
  experience:
    - company: Amazon
      position: Software Development Engineer
      date:
      start_date: 2024-02
      end_date: present
      location: Seattle/Bellevue, WA
      summary:
      highlights:
        - Shipped core transaction APIs used by 300 finance operations analysts, processing 1M transactions per month across accounts receivable cash application workflows.
        - Drove adoption of AI-assisted development across the team (background agents, SDLC updates, knowledge shares).
        - Built a high-fanout data retrieval layer that composes 28 upstream calls per request using Kotlin concurrency, sustaining p50 under 500 ms and p99 under 1.5 s on the heaviest paths.
        - Delivered a resilient integration with an upstream financial ledger despite incomplete APIs, ensuring accurate and consistent transaction data in production.
        - Owned the manual cash-application tool processing about 70K receipts per month across North America, Europe, and Far East, improving payment matching and structured data capture.
        - Improved the manual cash application experience (payment matching plus structured data capture), increasing data quality that directly feeds and improves automation outcomes.
        - Shipped integrated email search for payment remittance investigations, reducing analyst effort per receipt by 30 seconds by keeping the workflow in one tool.
    - company: Amazon
      position: Software Development Engineer Intern
      date:
      start_date: 2023-05
      end_date: 2023-08
      location: Jersey City, NJ
      summary:
      highlights:
        - Built a self-service React UI that enabled users to run on-demand cash application simulation testing, improving UAT coverage and account cash application rates.
        - Developed and deployed a serverless API using AWS Lambda and AWS AppSync with GraphQL integration.
    - company: Amazon
      position: Software Development Engineer Intern
      date:
      start_date: 2022-06
      end_date: 2022-08
      location: Jersey City, NJ
      summary:
      highlights:
        - Built a data and analytics platform for finance operations using Python, React, and AWS.
        - Deployed a cloud pipeline that filtered and aggregated over 5 million records using DynamoDB, Kinesis, S3, and Lambda.
        - Reduced analysis effort from roughly 10 hours per month to near-immediate access through custom analytics tooling.
  projects:
    - name: JKL
      link: https://github.com/cruzluna/jkl-2
      summary:
      highlights:
        - Tmux plugin that rethinks the list view with built-in agent status visibility.
        - Surfaces active agent state directly in terminal workflows for quick monitoring.
    - name: SPS
      link: https://github.com/cruzluna/sps
      summary:
      highlights:
        - Simple prompt storage.
  skills:
    - label: Languages
      details: TypeScript, Kotlin, Rust, Python, Go
    - label: Cloud and Infrastructure
      details: AWS (Lambda, S3, DynamoDB, AppSync, CDK, CloudFormation, Kinesis), networking, Docker
    - label: Systems
      details: Event-driven architectures, serverless systems, distributed systems, API design, performance optimization, observability
    - label: Interface design
      details: OpenAPI, Smithy, Stainless
    - label: Certifications
      details: AWS Certified Cloud Practitioner
  leadership_and_writing:
    - bullet: Host a technical book club on distributed systems and engineering topics.
    - bullet: Write technical blogs on engineering and software development.
sort_entries: none
`;

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
