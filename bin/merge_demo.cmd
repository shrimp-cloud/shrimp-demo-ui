:: cmd 脚本

::  ../shrimp-demo-ui/bin/merge_demo.cmd

xcopy "..\shrimp-demo-ui\html"  .\html /S/Y
xcopy "..\shrimp-demo-ui\public"  .\public /S/Y
xcopy "..\shrimp-demo-ui\vite"  .\vite /S/Y
xcopy "..\shrimp-demo-ui\package.json"  .\ /Y
xcopy "..\shrimp-demo-ui\vite.config.js"  .\ /S/Y
xcopy "..\shrimp-demo-ui\.nvmrc"  .\ /S/Y

:: src/api cas,common
xcopy "..\shrimp-demo-ui\src\api\cas.js"  .\src\api /S/Y
xcopy "..\shrimp-demo-ui\src\api\common.js"  .\src\api /S/Y

:: src
xcopy "..\shrimp-demo-ui\src\assets"  .\src\assets /S/Y
xcopy "..\shrimp-demo-ui\src\components"  .\src\components /S/Y
xcopy "..\shrimp-demo-ui\src\directive"  .\src\directive /S/Y
xcopy "..\shrimp-demo-ui\src\layout"  .\src\layout /S/Y
xcopy "..\shrimp-demo-ui\src\plugins"  .\src\plugins /S/Y
xcopy "..\shrimp-demo-ui\src\router"  .\src\router /S/Y
xcopy "..\shrimp-demo-ui\src\store"  .\src\store /S/Y
xcopy "..\shrimp-demo-ui\src\utils"  .\src\utils /S/Y
xcopy "..\shrimp-demo-ui\src\views\login.vue"  .\src\views /S/Y
xcopy "..\shrimp-demo-ui\src\App.vue"  .\src\ /S/Y
xcopy "..\shrimp-demo-ui\src\main.js"  .\src\ /S/Y
xcopy "..\shrimp-demo-ui\src\permission.js"  .\src\ /S/Y
xcopy "..\shrimp-demo-ui\src\settings.js"  .\src\ /S/Y
