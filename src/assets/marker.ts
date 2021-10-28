var red =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMi41OTYiIGhlaWdodD0iNDcuMTQ4IiB2aWV3Qm94PSIwIDAgMzIuNTk2IDQ3LjE0OCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2ZmZjtzdHJva2U6I2M4YzhjODt9LmJ7ZmlsbDojZTExOTAwO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjUgMC41KSI+PHBhdGggY2xhc3M9ImEiIGQ9Ik00My42LDE4LjhjMCw3LjE4LTEwLjcsMjMuOTM0LTE0LjQ4NywyOS42NDVhMS41NzIsMS41NzIsMCwwLDEtMi42MjIsMEMyMi43LDQyLjczMiwxMiwyNS45NzgsMTIsMTguOGExNS44LDE1LjgsMCwwLDEsMzEuNiwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyIC0zKSIvPjxjaXJjbGUgY2xhc3M9ImIiIGN4PSIxMCIgY3k9IjEwIiByPSIxMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNiA1LjcyNikiLz48L2c+PC9zdmc+";
var orange =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMS4wNzUiIGhlaWdodD0iNDQuOTI2IiB2aWV3Qm94PSIwIDAgMzEuMDc1IDQ0LjkyNiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2ZmZjtzdHJva2U6I2M4YzhjODt9LmJ7ZmlsbDojZmY2OTM3O308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjUgMC41KSI+PHBhdGggY2xhc3M9ImEiIGQ9Ik00Mi4wNzUsMTguMDM4YzAsNi44MzUtMTAuMTgsMjIuNzgyLTEzLjc4OSwyOC4yMThhMS41LDEuNSwwLDAsMS0yLjUsMEMyMi4xOCw0MC44MTksMTIsMjQuODcyLDEyLDE4LjAzOGExNS4wMzgsMTUuMDM4LDAsMCwxLDMwLjA3NSwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyIC0zKSIvPjxjaXJjbGUgY2xhc3M9ImIiIGN4PSI5LjUxOSIgY3k9IjkuNTE5IiByPSI5LjUxOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS43MTEgNS40NSkiLz48L2c+PC9zdmc+";
function createMarker(color: string) {
  var svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32.596" height="47.148" viewBox="0 0 32.596 47.148">
  <defs>
      <style>.a{fill:#fff;stroke:#c8c8c8;}.b{fill:${color};}</style>
  </defs>
  <g transform="translate(0.5 0.5)">
      <path class="a" d="M43.6,18.8c0,7.18-10.7,23.934-14.487,29.645a1.572,1.572,0,0,1-2.622,0C22.7,42.732,12,25.978,12,18.8a15.8,15.8,0,0,1,31.6,0Z" transform="translate(-12 -3)"/>
      <circle class="b" cx="10" cy="10" r="10" transform="translate(6 5.726)"/>
  </g>
</svg>`;
  return 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(svg);
}
var clinicIcon = `<svg width="32.596" height="47.148" xmlns="http://www.w3.org/2000/svg">
<g>
 <title>Layer 1</title>
 <g id="svg_1">
  <path class="a" d="m32.1,16.3c0,7.18 -10.7,23.934 -14.487,29.645a1.572,1.572 0 0 1 -2.622,0c-3.791,-5.713 -14.491,-22.467 -14.491,-29.645a15.8,15.8 0 0 1 31.6,0z" fill="#fff" stroke="#c8c8c8" id="svg_2"/>
  <circle class="b" cx="16.5" cy="16.226" r="10" fill="#e11900" id="svg_3"/>
 </g>
 <rect fill="#fff" stroke="#000" x="-242.70203" y="-245.22601" width="0" height="1" id="svg_4"/>
 <path stroke="#e11900" fill="#fff" d="m10.15745,14.35449l4.2153,0l0,-3.99466l4.32409,0l0,3.99466l4.2153,0l0,4.09777l-4.2153,0l0,3.99466l-4.32409,0l0,-3.99466l-4.2153,0l0,-4.09777z" id="svg_5"/>
</g>

</svg>`
function createClinicIcon(){
  return 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(clinicIcon);
}
export default { red, orange, createMarker ,createClinicIcon};
