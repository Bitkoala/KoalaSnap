import os
import sys

# Force UTF-8 for stdout
sys.stdout.reconfigure(encoding='utf-8')

print("Starting fix_icons.py...")

files = [
    "landing-page.html",
    "privacy.html",
    "documentation.html",
    "installation.html"
]

# We will look for part of the BAD string.
# Discord bad path starts: M20.211 0H3.794
bad_discord_part = "M20.211 0H3.794" 
good_discord_d = 'd="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09.01-.02-.01-.07-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.2 2.65.03.01.06 0 .07-.03.4-.54.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.66-.25-1.29-.54-1.89-.87-.04-.02-.04-.07 0-.09.12-.08.24-.17.35-.25.02-.01.04-.01.06 0 3.73 1.7 7.76 1.7 11.44 0 .02-.01.04-.01.06 0 .11.08.23.17.35.25.04.02.04.07 0 .09-.6.33-1.23.62-1.89.87-.04.01-.06.05-.04.09.31.61.67 1.2 1.07 1.74.01.03.04.04.07.03 1.67-.53 3.4-1.33 5.2-2.65.02-.01.03-.03.03-.05.41-4.32-.46-8.28-3.1-11.95-.01-.01-.02-.02-.03-.02ZM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12z"'

# WeChat bad path starts: M20.2 14c0 3.8
bad_wechat_part = "M20.2 14c0 3.8"
good_wechat_d = 'd="M8 .5C3.58 .5 0 3.33 0 6.83c0 2.12 1.3 4.02 3.29 5.3-.17 .64-1.01 2.27-1.16 2.53-.05 .08 .04 .16 .13 .11 1.44-.81 3.23-1.8 4.29-2.31 .48 .09 .98 .14 1.49 .11C7.43 11.53 7 10.42 7 9.22c0-3.66 4.34-6.64 9.7-6.64 .51 0 1 .03 1.48 .08C16.89 1.1 12.72 .5 8 .5zm5.79 7.64c-3.14 0-5.69 2.05-5.69 4.58 0 2.53 2.55 4.58 5.69 4.58 .69 0 1.35-.11 1.95-.3 .74 .37 2.19 1.05 2.76 1.3 .06 .03 .13-.02 .1-.08-.18-.46-.73-1.63-.85-2.07 1.39-.9 2.27-2.22 2.27-3.69 .01-2.53-2.54-4.58-5.68-4.58zM6.63 4.28c.38 0 .69 .26 .69 .58s-.31 .58-.69 .58c-.38 0-.69-.26-.69-.58s.31-.58 .69-.58zm3.74 0c.38 0 .69 .26 .69 .58s-.31 .58-.69 .58c-.38 0-.69-.26-.69-.58s.31-.58 .69-.58zm2.87 7.07c.38 0 .69 .26 .69 .58s-.31 .58-.69 .58c-.38 0-.69-.26-.69-.58s.31-.58 .69-.58zm4.08 0c.38 0 .69 .26 .69 .58s-.31 .58-.69 .58c-.38 0-.69-.26-.69-.58s.31-.58 .69-.58z"'

def replace_svg_in_content(content, bad_part, good_d):
    # Find the occurance
    idx = content.find(bad_part)
    if idx == -1:
        return content, False
    
    # "d=" is usually 3 chars before, but flexibility is better.
    # We will search backwards for 'd="' or 'd ="'
    # Actually, simplistic approach: find the full attribute string by finding quotes around the bad_part.
    
    # Locate the quote before bad_part
    quote_start = content.rfind('"', 0, idx)
    if quote_start == -1:
        return content, False
    
    # Locate the quote after bad_part
    quote_end = content.find('"', idx)
    if quote_end == -1:
        return content, False
    
    # Now expand backwards from quote_start to find 'd='
    # Verify if it is indeed d attribute
    # check prefix
    prefix_check = content[quote_start-3 : quote_start] # should be d=
    if "d=" not in prefix_check and "d =" not in prefix_check:
        print(f"Warning: Found string but not preceded by d=. Context: {content[quote_start-5:quote_start]}")
        # proceed anyway? maybe it's valid. 
        # But safest is to replace the whole 'd="...."' string.
    
    # Find start of attribute. 
    # Just replacing the quoted content + d= prefix if possible.
    # Actually, simpler: replace the whole string we constructed?
    # NO, because the bad_part was only a substring.
    
    old_string = content[quote_start : quote_end+1] # "M..."
    # We need to include 'd=' to be safe or just replace content inside quotes?
    # The good_d includes 'd="...'. So we should replace `d="OLD"` with `d="NEW"`.
    
    # Find exact start of 'd='
    attr_start = content.rfind('d=', 0, quote_start)
    if attr_start == -1:
        attr_start = content.rfind('d =', 0, quote_start)
    
    if attr_start == -1:
        print("Could not find 'd=' attribute start")
        return content, False
        
    full_old_attr = content[attr_start : quote_end+1]
    
    # Check if this looks like a git conflict or something weird? No.
    
    print(f"Replacing: {full_old_attr[:30]}...{full_old_attr[-10:]}")
    new_content = content.replace(full_old_attr, good_wechat_d if bad_part == bad_wechat_part else good_discord_d)
    return new_content, True

cwd = os.getcwd()
print(f"Current working directory: {cwd}")

for filename in files:
    path = os.path.join(cwd, filename)
    if not os.path.exists(path):
        print(f"File not found: {filename}")
        continue
        
    print(f"Checking {filename}...")
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        initial_len = len(content)
        modified = False
        
        # Replace Discord
        content_new, changed = replace_svg_in_content(content, bad_discord_part, good_discord_d)
        if changed:
            print("  Fixed Discord")
            content = content_new
            modified = True
        else:
            print("  Discord target not found")
            
        # Replace WeChat
        content_new, changed = replace_svg_in_content(content, bad_wechat_part, good_wechat_d)
        if changed:
            print("  Fixed WeChat")
            content = content_new
            modified = True
        else:
            print("  WeChat target not found")
            
        if modified:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  Saved {filename}")
        else:
            print(f"  No changes for {filename}")
            
    except Exception as e:
        print(f"Error: {e}")
