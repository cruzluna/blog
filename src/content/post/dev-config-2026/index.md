---
title: "[WIP]: My Local Set up to get the most out of AI"
description: "During 2025, Ive increasingly become AI and tmux pilled. I find them to be a match made in heaven if you like terminal agents."
publishDate: "31 Jan 2026"
tags: ["ai", "tmux", "tui"]
---

So here is where I got to: 

<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">finally an easy way to add context to my tmux sessions and ability to search it with fzf <a href="https://t.co/dshBVPlgYq">pic.twitter.com/dshBVPlgYq</a></p>&mdash; Cruz (@nvimcruz) <a href="https://twitter.com/nvimcruz/status/2010462992195055748?ref_src=twsrc%5Etfw">January 11, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 


It closed a gap in my personal set up I've been needing. I've been using the tmux session name as the context of what is being worked on. The challenge is that this is pretty dynamic. You finsih something, merge it, and then you get a new task. You jump back into the session because you are up to date on the main branch. You forget to update the title, and then "hey can you help me on this" or "we have something more urgent that needs to be worked on". And then 

``` bash 
# session picker popup
bind f display-popup -E -w 40% -h 40% -s "bg=#101010" -S "fg=#282828" -b rounded \
        "tmux list-sessions -F '#{session_id},#{session_name}' | \
        jq -R -n -c '[inputs | split(\",\") | {session_id: .[0], session_name: .[1]}]' | \
        jq -r --slurpfile meta ~/.tmux/resurrect/session_contexts.json \
          '(\$meta[0]|INDEX(.session_id)) as \$m | \
           map(. + (\$m[.session_id] // {})) as \$sessions | \
           (\$sessions | map(.session_name | length) | max) as \$max_len | \
           \$sessions[] | \
           (.session_name | length) as \$name_len | \
           ((.context // \"\") | if length > 50 then .[0:50] else . end) as \$context_trunc | \
           (.session_name + (\" \" * (\$max_len - \$name_len + 2)) + \$context_trunc)' | \
        fzf --reverse --border=none --margin=1 --padding=1 \
        --prompt='  ' --pointer='▌' --no-scrollbar \
        --color=bg:#101010,bg+:#232323,fg:#A0A0A0,fg+:#FFFFFF,hl:#FFC799,hl+:#FFC799,pointer:#FFC799,prompt:#FFC799,info:#5C5C5C | \
        awk '{print \$1}' | \
        xargs -I{} tmux switch-client -t {}"

# set context for current session (no prefill)
bind c command-prompt -p "Context for #S:" "run-shell '~/.tmux/save_session_context \"%%\"'"
bind e run-shell '~/.tmux/edit_session_context'
```

As soon as I wanted to add more configuration, I knew it wouldn't be maintainable. And it would be true ai slop because every edit would look like:

` prompt -> test -> prompt again until I like it`

This most of the time fine but with one caveat, I wouldn't feel that comfortable editing the code since its ugly and not easy to read syntax. I find agents are exponentially better with a human in the loop that is director, not simply a validator that doesn't give technical direction. We have to be more than a PM with requirements, typically we need to give the agent technical guidance.

💡 It hit me, lets create a tui with a table component. Boom easy. It will be more configurable, code that is more manageable, and something I would feel more comfortable making changes and telling the AI, "hey you did this wrong, I want ** the code ** like this". Otherwise, the prompts would look more like: "this looks wrong, make it look like....", which I find to be less successful and leads to more ai slop.  



The scripts I started with: 

`~/.tmux/edit_session_context`
``` bash
#!/usr/bin/env bash
set -euo pipefail

json_file="${HOME}/.tmux/resurrect/session_contexts.json"
session_id=$(tmux display-message -p '#{session_id}')
session_name=$(tmux display-message -p '#{session_name}')

# Get existing context from JSON (empty string if not found)
existing_context=""
if [[ -f "$json_file" ]]; then
  existing_context=$(jq -r --arg id "$session_id" \
    '.[] | select(.session_id == $id) | .context // ""' "$json_file")
fi

# Open command-prompt with pre-filled value, call save script with context
tmux command-prompt -I "$existing_context" -p "Context for $session_name:" \
  "run-shell '~/.tmux/save_session_context \"%%\"'"
```

`~/.tmux/save_session_context`

``` bash
#!/usr/bin/env bash
set -euo pipefail

json_file="${HOME}/.tmux/resurrect/session_contexts.json"
session_id=$(tmux display-message -p '#{session_id}')
session_name=$(tmux display-message -p '#{session_name}')
new_context="$1"

mkdir -p "$(dirname "$json_file")"

# Initialize empty array if file doesn't exist
if [[ ! -f "$json_file" ]]; then
  echo '[]' > "$json_file"
fi

# Upsert: update existing or add new entry
jq --arg id "$session_id" \
   --arg name "$session_name" \
   --arg ctx "$new_context" \
   'if any(.[]; .session_id == $id)
    then map(if .session_id == $id then .context = $ctx | .session_name = $name else . end)
    else . + [{"session_id": $id, "session_name": $name, "context": $ctx}]
    end' "$json_file" > "$json_file.tmp" && mv "$json_file.tmp" "$json_file"

```

