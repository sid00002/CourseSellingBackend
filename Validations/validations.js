const zod = require("zod");
const express = require("express");

function validateUserInput(obj) {
  const userZodSchema = zod.object({
    username: zod.string().min(2),
    password: zod.string().min(8),
  });
  const response = userZodSchema.safeParse(obj);
  return response;
}

module.exports = validateUserInput;
