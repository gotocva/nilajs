#!/usr/bin/env node

const { Command } = require("./lib/commander");

const { createApp } = require("./create-app");
const { createController } = require("./create-controller");
const { createModel } = require("./create-model");
const { createModule } = require("./create-module");

const program = new Command()

program.name("Nilajs").description("Nilajs Commands for Express Boilerplate").version("0.0.1")



program
.command("create:app")
.description("Build REST application")
.argument("<appName>", "Application Name")
.action(async (appName) => {
    createApp(appName);
})


program
.command("create:controller")
.description("Generate a new controller")
.argument("<controllerName>", "Controller Name")
.action(async (controllerName) => {
    createController(controllerName);
});

program
.command("create:model")
.description("Generate a new model")
.argument("<modelname>", "Model Name")
.action(async (modelname) => {
    createModel(modelname);
});

program
.command("create:module")
.description("Generate a new module with model, route and controller")
.argument("<moduleName>", "Module Name")
.action(async (moduleName) => {
    createModule(moduleName);
});



program.parse(process.argv)