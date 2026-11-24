import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../App";

describe("App Render Test", () => {
  it("renders App component without throwing", () => {
    const html = renderToString(<App />);
    expect(html).toBeTruthy();
    expect(html.length).toBeGreaterThan(100);
  });
});
