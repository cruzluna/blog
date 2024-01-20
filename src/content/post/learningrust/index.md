---
title: "Rust Learning Journey"
description: "This posts describes my process of learning Rust, and will act as a log of my journey"
publishDate: "1 Jan 2024"
tags: ["rust", "learning"]
---

# Learning rust

---

## 12/28/2023

I have been diving into Go lately because it is fun for me. Go’s simplicity, static typed system, and concurrency support make it a very intriguing language and fun experience while learning. Recently, theres a project that a group of friends want to jump on and it requires either Typescript or Rust. All of us are proficient in TS enough to begin prototyping, but this type of project is supposed to be a learning experience, rather than a time crunch to deliver. As a result, we are choosing to go with Rust. For me, I am conflicted because I am currently diving into Go, and learning Rust will mean I have competing interests for my brain’s learning capabilities. Here is my reasoning to learn Rust and to simultaneously dive into Go:

For one, Rust seems to be continuously popping up in the industry as a language for performant systems and if I don’t at least become familiar with the language, I risk being left behind and phased out. Secondly, I am confident enough in Go where I can start diving into Rust. Ideally a Go and Rust tech stack seems to be somewhat bullet proof for the future. The likes of Vercel, Discord, Uber, AWS, Meta are using Rust or Go (or both). As a result, it’s time to speed run this Rust book and then I will rewrite one of my Go apps to Rust. Then, I should be ready to jump into this project with my friends.

I am going to document my speed run….. I might be underestimating the difficulty of Rust…..only time will tell.

On chapter 2….. I don’t have the patience to read all this and go through it. I just wanna build already :/

Got through it. A friend said power through the book and then rewrite one of my previous projects is a good strat.

On chapter 3. So far the basic stuff. Nothing hard to grasp.

Chapter 4→ ownership….enables memory safety without a garbage collector. Definitely a new concept that seems like it can become tedious to manage. But it might become fun….If I didn’t want to care about things, I would just use Python for everything. I’d imagine a large Rust codebase could become difficult to manage. Ok done with 4, and it was a lot to take in, but seems like a fun challenge. I just want to start coding XD

## 12/29/2023

Day 2 of reading the book. Speed running and I think I am ready to rewrite an HTTP server in Rust. Just trying to cover the basics, to prevent too many unnecessary headaches. I am a full on rust shill at this point and its only Day 2. Rewrite the world in Rust!!

Wow the topics got increasingly more unfamiliar and the more examples shown, the more confusing it got with the borrow checker. I skipped a decent amount of the sections that are more advanced or what I seemed unnecessary for a speed run (ie More about cargo, Smart pointers). The video I watched recommended skipping the programming projects and to go through it as fast as possible. Which I did, and I took notes.

Now it is time to rewrite one of my Go apps. Essentially it is a HTTP server. I was more excited yesterday, but it is getting late and the borrow checker and ownership is definitely intimidating me. It reminds me why I love Go. So simple and effective at pushing code.

2 hours later….HAHA Wow a what a mistake. I skipped section that goes over package structure and already had issues with crate hierarchy….

## 01/01/2024

Taking a break today. Rust is mentally tiring initially to learn, but I am slowly seeing why its a powerful language. One thing I can say for sure is that the compiler
is a good teacher. The error messages tend to be on point and are helpful in remedying bugs. My current sticking point of difficulty are the different string types and some
of the language stuff like impl, traits, and the borrow checker.

## 01/20/2024

Back from vacation. I want to learn more about Wasm and I think this could be a nice little learning project to jump on. I know I tried to do the rewrite of the rate limiter, but it was annoying me and honestly I like my Go implementation and it doesn't truly interest me to completely rewrite it right now.
This Wasm project is more intriguing at the moment. I do have two worries: 1) I am trying to learn two difficult things at the same time. 2) I am not diving deep into Go, which I want to master. My reconciliation is that at work I am going to try to use Go and this Rust learning is just a small side project to promote learning. And a side note, from some very limited research, Rust Wasm seems to be superior than Go's because of the garbage collector.
