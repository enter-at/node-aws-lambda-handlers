SHELL := /bin/bash

# List of targets the `readme` target should call before generating the readme
export README_TEMPLATE_FILE ?= .README.md.gotmpl

-include $(shell curl -sSL -o .build-harness "https://git.io/build-harness"; echo .build-harness)
-include $(shell curl -sSL -o $(README_TEMPLATE_FILE) "https://git.io/enter-at-readme")
