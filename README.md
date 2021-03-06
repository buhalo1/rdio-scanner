# Rdio Scanner v3.1

*Rdio Scanner* is a progressive web interface designed to act like an old school police radio scanner. It integrates all frontend / backend components to manage audio files from different sources.

For now, only [Trunk Recorder](https://github.com/robotastic/trunk-recorder) generated files can be used, but other audio sources can be added later on request.

Need help?

[![Chat](https://img.shields.io/gitter/room/rdio-scanner/Lobby.svg)](https://gitter.im/rdio-scanner/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

#### WARNING

*RDIO SCANNER* IS INTENDED FOR **PERSONAL USE ONLY**, OR FOR VERY SPECIFIC USE CASE SUCH AS FOR FD PD EMS AGENCIES OR 911 CALL CENTERS. ***RDIO SCANNER* IS NOT INTENDED FOR BROADCASTING TO THE GENERAL PUBLIC**, PAID ACCESS OR NOT.

FOR THE SAKE OF OUR HOBBY, PLEASE KEEP THIS WARNING IN MIND. THIS WILL HELP KEEP AIR WAVES UNENCRYPTED.

## What's new in this version

Version 3.1 brings new features:

* Code refactoring
* Display live feed listeners count on server end

*Note that you can only update from version 2.0 and above. You have to do a fresh install if your actual version is prior to version 2.0.*

## Features

* Designed to act as an old school police radio scanner
* Incoming calls are queued for lossless listening
* Temporarily hold a single system or a single talkgroup
* Select the talkgroups you want to listen to in live streaming mode
* Easily retrieve and replay or download past calls
* Supports UID aliases
* Control active talkgroups by their system or group
* Easy to install and configure

## Screenshots

### Main screen

Here's where incoming calls are displayed, as long as *LIVE FEED* is enabled.

![Main Screen](./docs/images/rdio_scanner_main.png?raw=true "Main Screen")

* LED area
  * is *ON* when playing a call
  * is *Blinking* when pause is *ON* and a call is currently playing

* Display area
  * Real time clock
  * (Q :) Number of calls in the listening queue
  * System name, alpha tag, tag, group, call duration and focus group description
  * (F :) Call frequency
  * (S :) Spike errors
  * (E :) Decoding errors
  * (TGID :) Talkgroup ID
  * (UID :) Unit ID
  * Call history of the last five calls
  * Double clicking or tapping this area will toggle fullscreen display

* Control area
  * LIVE FEED: When enabled, incoming calls are place in the queue for playback. The queue will be emptied if it is disabled
  * HOLD SYS: Temporarily hold the current call system, depending on the current talkgroups selection
  * HOLD TG: Same has HOLD SYS, but for the current talkgroup
  * REPLAY LAST: Replay the current call or the previous call if there is none playing
  * SKIP NEXT: Ignore the current call and immediately play the next call in queue
  * AVOID: Toggle the current talkgroup from the talkgroups selection. Calls from avoided talkgroups will be removed from the call queue
  * SEARCH CALL: Brings the search call screen
  * PAUSE: Pause playing of queued calls
  * SELECT TG: Bring the talkgroups selection screen

Note that if you change the talkgroups selection while holding a system or a talkgroup, it will replace the current talkgroups selection by those that are currently holded.

### Talkgroups selection screen

The talkgroups selection screen is where you select the talkgroups. You can either select them individually, by system, by group or globally.

Enabled talkgroup calls will be queued for listening.

![Talkgroups Selection](./docs/images/rdio_scanner_select.png?raw=true "Talkgroups Selection")

### Search call screen

This screen allows you to browse past calls. You can filter the list by date, system and talkgroups.

![Call Search](./docs/images/rdio_scanner_search.png?raw=true "Call Search")

Search filters at the bottom of this screen are self explanatory.

## Quick start

It is fairly easy to have *Rdio Scanner* up and running.

> Raspberry Pi users, visit [rdio-scanner-pi-setup](https://github.com/chuot/rdio-scanner-pi-setup) repository for a fully automatic installation script.

Ensure that your operating system is **fully updated** and that the prerequisites are met or installed:

* [Curl](https://git-scm.com/downloads)
* [Git](https://git-scm.com/downloads)
* [SQLite 3](https://www.sqlite.org/download.html)
* [Node.js v12.X or higher](https://nodejs.org/en/download/) (get it [here](https://github.com/nodesource/distributions) if your distro doesn't have the required package)
* [npm](https://www.npmjs.com/get-npm)

> The Angular application will most likely fail to transpile if the host has less than 2 GB of RAM available.

Then clone the *Rdio Scanner* code and run it:

```bash
$ git clone https://github.com/chuot/rdio-scanner.git
Cloning into 'rdio-scanner'...
remote: Enumerating objects: 1384, done.
remote: Counting objects: 100% (1384/1384), done.
remote: Compressing objects: 100% (1284/1284), done.
remote: Total 1384 (delta 752), reused 112 (delta 24)
Receiving objects: 100% (1384/1384), 1010.15 KiB | 4.83 MiB/s, done.
Resolving deltas: 100% (752/752), done.

$ cd rdio-scanner

$ node run.js
Default configuration created at /home/radio/rdio-scanner/server/.env
Make sure your upload scripts use this API key: 1b0800a0-2b5d-422c-a4e3-972d5c1d32ff
Building client app... done
Creating SQLITE database at /home/radio/rdio-scanner/server/database.sqlite... done
Rdio Scanner is running at http://0.0.0.0:3000/
```

Note that the first time you start *Rdio Scanner*, it will be longer to do so as it has to install required node modules and build the progressive web app. If it fails at this point, you can rerun the following command for more information on the reasons for the failure.

```bash
$ DEBUG=true node run.js
```

A default configuration file `rdio-scanner/server/.env` will be created. A new random API key will be generated where it will have to be use in your upload scripts.

At this point, you should be able to access to *Rdio Scanner* with a browser; just enter the above URL.

However, you won't see anything as you need first to upload your configuration (systems/talkgroup) to *Rdio Scanner*. For that, you can refer the to the upload scripts from the *examples section* below.

## Configuration file

*Rdio Scanner* configuration file is located at `rdio-scanner/server/.env`.

You can setup the following variables to suit your needs.

### Node environment parameters

```bash
#
# Default values are:
#
#   NODE_ENV=production
#   NODE_HOST=0.0.0.0
#   NODE_PORT=3000
#

# Node environment
NODE_ENV=development

# Node host
NODE_HOST=127.0.0.1

# Node port
NODE_PORT=3000
```

### Database related parameters

```bash
#
# Default values are:
#
#   DB_DIALECT=sqlite
#   DB_STORAGE=database.sqlite
#

# Database host
DB_HOST=127.0.0.1

# Database port
DB_PORT=3306

# Sequelize ORM dialect
DB_DIALECT=mariadb

# Database name
DB_NAME=rdio_scanner

# Database user
DB_USER=rdio_scanner

# Database password
DB_PASS=password

# Database storage location
DB_STORAGE=
```

### Rdio Scanner parameters

```bash
#
# Default values are:
#
#   RDIO_APIKEYS=["b29eb8b9-9bcd-4e6e-bb4f-d244ada12736"] (randomly generated)
#   RDIO_PRUNEDAYS=7
#

# Rdio Scanner API KEYS
#
# Note: The value has to be in JSON parsable format.
#
# You can either provide an array of API keys. This will allow the uploader to upload to any system/talkgroup
RDIO_APIKEYS=["b29eb8b9-9bcd-4e6e-bb4f-d244ada12736"]
# Or an array of object that tells Rdio Scanner the systems the uploader can upload.
RDIO_APIKEYS=[{"key":"b29eb8b9-9bcd-4e6e-bb4f-d244ada12736","systems":[11,15,21]}]
# Or an array of object that tells Rdio Scanner the systems and the talkgroup the uploader can upload.
RDIO_APIKEYS=[{"key":"b29eb8b9-9bcd-4e6e-bb4f-d244ada12736","systems":[{"system":11,"talkgroups":[54125,54129,54241]}]}]
# You can also provide an array of the 3 different formats mixed all together.

# Rdio Scanner database pruning
#
# Calls older than this number of days will be expunge from the database.
RDIO_PRUNEDAYS=30

# Rdio Scanner allow download
#
# Allow users to download calls from the search pane.
# This option is true by default.
RDIO_ALLOW_DOWNLOAD=false

# Rdio Scanner use group
#
# Allow talkgroup activation/deactivation based on their assigned group
# (from the talkgroup CSV files). Depending on your setup, you can turn off
# this feature.
#
# This option is true by default
RDIO_ALLOW_DOWNLOAD=false
```

## Updating Rdio Scanner thereafter

With simplicity, you can update *Rdio Scanner* with one command:

```bash
$ node update.js
Pulling new version from github... done
Updating node modules... done
Migrating database... done
Building client app... done
Please restart Rdio Scanner
```

## Examples

Those examples files are provided as-is to help you with *Rdio Scanner* system integration.

### docs/examples/rdio-scanner/dotenv

If the automaticaly generated `server/.env` file is not enough for you, this file contains all the parameters you can tweak to your needs.

### docs/examples/rdio-scanner/rdio-scanner.service

If you want *Rdio Scanner* to starts automaticaly upon reboots, this systemd unit file will help you with that. Just copy it as root to `/etc/systemd/system` and modify it to match your own configuration. Make sure that the paths, user and group are the correct one.

Then activate it and start it.

```bash
$ sudo systemctl daemon-reload
$ sudo systemctl enable rdio-scanner
$ sudo systemctl start rdio-scanner
```

### docs/examples/trunk-recorder

The folowing files assumes that you're using this folder layout. It isn't mandatory, but it helps keepings things well organized.

```
~/trunk-recorder
~/trunk-recorder/audio_files
~/trunk-recorder/configs/*.json
~/trunk-recorder/scripts/upload-*.sh
~/trunk-recorder/talkgroups/*.csv
```

### docs/examples/trunk-recorder/configs

Those files are provided only for example purposes.

However, it is important to note that each system is configured to **not record** unknown talkgroups (not listed in related CSV file).

Also, notice how we pass the *arbitrary* system number to the `uploadScript`.

```bash
{
    "systems": [{
        ...
            "recordUnknown": false
            ...
            "uploadScript": "scripts/upload-call.sh 11"
        ...
    }]
}
```

### docs/examples/trunk-recorder/scripts/upload-call.sh

This is the upload script for *Trunk Recorder*, It needs to be called with a **system number as the first argument**, then the **full path to the audio file as the second argument**.

```bash
$ upload-call.sh 11 .../trunk-recorder/audio_files/...
```

This script use [fdkaac](https://github.com/nu774/fdkaac) to convert audio files. It should be avaiable from your linux distro (debian and redhat based). Same goes for `curl` which is use to upload *Trunk Recorder* data to *Rdio Scanner*.

**Please change the API key inside it for the one that has been created above within the *quick start section*. Same for the URL where to upload to Rdio Scanner instance**

```bash
curl -s http://127.0.0.1:3000/api/trunk-recorder-call-upload \
     ...
     -F "key=b29eb8b9-9bcd-4e6e-bb4f-d244ada12736" \
     ...
```

### docs/examples/trunk-recorder/scripts/upload-systems.sh

Much like the previous script, this one is in charge of feeding *Rdio Scanner* with *Trunk Recorder* systems and talkgroups.

You need to upload systems and talkgroups definitions to *Rdio Scanner*, the first time you have installed it, and each time you change any *Trunk Recorder*'s configuration.

Note that if you want to remove a system from the *Rdio Scanner* configuration, simply upload an empty CSV file.

**Same here, please change the API key inside it for the one that has been created above within the *quick start section*. Same for the URL where to upload to Rdio Scanner instance**

Once uploaded, you should have your systems and talkgroups listed on *Rdio Scanner* talkgroups selection screen.

### docs/examples/trunk-recorder/scripts/upload-aliases.sh

This script is optional. Use it if you want P25 unit id to be displayed as name instead of number.

### docs/examples/trunk-recorder/systemd

Provided as complimentary files, `trunk-recorder@.service` and `trunk-recorder@.timer` can be use to manage multiple *Trunk Recorder* instances. For example, if you have more that 1 system that requires different *gains* / *tuners* each.

you can either just enable the `trunk-recorder@[config_name].service` or the `trunk-recorder@[config_name].timer`. The later one starts *Trunk Recorder* a minute after the system has booted up. This allows the *rtl-sdr* dongle to warm up a little bit before going crazy (less control channel decoding rate errors in my case).

### docs/examples/trunk-recorder/talkgroups

Since *Trunk Recorder* should only records **knowed** talkgroups, they should be well configured in each CSV files.

**Not having talkgroups well defined will make *Rdio Scanner* display calls with much less informations on screen.**

### docs/examples/trunk-recorder/aliases

This is where you put your UID aliases per system.
