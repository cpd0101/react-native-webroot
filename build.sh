#!/bin/sh
# @Author: tanshaohui
# @Date:   2015-11-28 13:20:33
# @Last Modified by:   tanshaohui
# @Last Modified time: 2015-11-28 15:33:28

babel --presets react,es2015 react -d build

git add .

git commit -am 'build'

git push