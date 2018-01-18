Testing an SPV implementation of BTCR
=====================================
Right now just an electron app scaffold implementing an SPV wallet using
[Bcoin](http://bcoin.io/)

Install
-------

    export npm_config_target=1.7.8
    export npm_config_arch=x64
    export npm_config_target_arch=x64
    export npm_config_disturl=https://atom.io/download/electron
    export npm_config_runtime=electron
    export npm_config_build_from_source=true
    HOME=~/.electron-gyp npm install

Run
---

    npm start

