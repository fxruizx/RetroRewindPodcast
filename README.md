# ![](http://retrorewindpodcast.com) Retro Rewind Podcast Theme and Template Development
Redesign and develop the fourth iteration of the Retro Rewind Podcast's website, utilizing Grav CMS for the first time.

**New Technologies Learned**
* Grav CMS
* Twig templating

**Technologies Further Developed**
* Yaml front-matter data implementation
* Gulp

**Core Technologies Used**
* HTML
* Sass
* Javascript
* CLI

## Key Take Aways
Version 3 of RRP's website was developed in Jekyll which while giving me my first exposure to Yaml frontmatter, Jekyll itself became too cumbersome to use especially when it came to scheduling posts (I never could in Jekyll).
Coming from Jekyll, Grav had a very even learning curve and I found the flexibility of creating page templates with twig very intuitive. Creating my own blueprint files was less intuitive and required reading Grav's documentation more thourouly. In summary:
* Grav has similar flat-file based output as Jekyll, making it less prone to hacking unlike Wordpress.
* Includes a lot of the niceties of a CMS like wordpress, e.g. scheduling posts, easy pretty links (routing)
* Twig templates offer a lot of flexibility and make coding DRY more possible
* Blueprints for Yaml frontmatter are a challenge to pin down where to create them in the Grav file structure, and then how to write them