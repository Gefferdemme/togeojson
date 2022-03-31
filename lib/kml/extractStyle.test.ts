import { extractStyle } from "./extractStyle";
import xmldom from "@xmldom/xmldom";

describe("extractStyle", () => {
  it("passes-through CSS colors", () => {
    expect(
      extractStyle(
        new xmldom.DOMParser().parseFromString(`<Style>
<IconStyle>
<Icon>
<href>https://earth.google.com/earth/rpc/cc/icon?color=1976d2&amp;id=2000&amp;scale=4</href>
</Icon>
<hotSpot x="64" y="128" xunits="pixels" yunits="insetPixels"/>
</IconStyle>
<LabelStyle>
</LabelStyle>
<LineStyle>
<color>ff9f3f30</color>
<width>2.13333</width>
</LineStyle>
<PolyStyle>
<color>4058eeff</color>
</PolyStyle>
<BalloonStyle>
<displayMode>hide</displayMode>
</BalloonStyle>
</Style>`).firstChild as Element
      )
    ).toEqual({
      fill: "#ffee58",
      "fill-opacity": 0.25098039215686274,
      icon: "https://earth.google.com/earth/rpc/cc/icon?color=1976d2&id=2000&scale=4",
      "icon-color": "#303f9f",
      "icon-offset": [64, 128],
      "icon-opacity": 1,
      "label-color": "#303f9f",
      "label-opacity": 1,
      stroke: "#303f9f",
      "stroke-opacity": 1,
      "stroke-width": 2.13333,
    });
  });
});

it("passes-through CSS colors (2)", () => {
  expect(
    extractStyle(
      new xmldom.DOMParser().parseFromString(`<Style id="StyleNo1">
<IconStyle>
<color>ff000000</color>
<scale>0.5</scale>
<Icon>
<href>http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png</href>
</Icon>
</IconStyle>
<LabelStyle>
<color>ff000000</color>
</LabelStyle>
<LineStyle>
<color>ff0000ff</color>
<width>2</width>
</LineStyle>
<PolyStyle>
<color>7f000000</color>
</PolyStyle>
</Style>`).firstChild as Element
    )
  ).toEqual({
    fill: "#000000",
    "fill-opacity": 0.4980392156862745,
    icon: "http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png",
    "icon-color": "#000000",
    "icon-opacity": 1,
    "icon-scale": 0.5,
    "label-color": "#000000",
    "label-opacity": 1,
    stroke: "#ff0000",
    "stroke-opacity": 1,
    "stroke-width": 2,
  });
});
