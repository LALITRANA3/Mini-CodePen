document.addEventListener("DOMContentLoaded", () => {
  const htmlCode = document.getElementById("html-code");
  const cssCode = document.getElementById("css-code");
  const jsCode = document.getElementById("js-code");
  const output = document.getElementById("output");

  // ✅ RUN
  document.getElementById("run-btn").addEventListener("click", () => {
    const html = htmlCode.value;
    const css = `<style>${cssCode.value}</style>`;
    const js = `<script>${jsCode.value}<\/script>`;

    const finalCode = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${css}
      </head>
      <body>
        ${html}
        ${js}
      </body>
      </html>
    `;

    output.srcdoc = finalCode;
  });

  // ✅ RESET
  document.getElementById("reset-btn").addEventListener("click", () => {
    htmlCode.value = "";
    cssCode.value = "";
    jsCode.value = "";
    output.srcdoc = "";
    localStorage.removeItem("miniCodePen");
  });

  // ✅ SAVE
  document.getElementById("save-btn").addEventListener("click", () => {
    const data = {
      html: htmlCode.value,
      css: cssCode.value,
      js: jsCode.value
    };
    localStorage.setItem("miniCodePen", JSON.stringify(data));
    alert("✅ Code saved successfully!");
  });

  // ✅ LOAD SAVED
  const saved = localStorage.getItem("miniCodePen");
  if (saved) {
    const data = JSON.parse(saved);
    htmlCode.value = data.html;
    cssCode.value = data.css;
    jsCode.value = data.js;
  }

  // ✅ DOWNLOAD
  document.getElementById("download-btn").addEventListener("click", () => {
    const finalCode = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>${cssCode.value}</style>
      </head>
      <body>
        ${htmlCode.value}
        <script>${jsCode.value}<\/script>
      </body>
      </html>
    `;

    const blob = new Blob([finalCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    a.click();
    URL.revokeObjectURL(url);
  });
});
