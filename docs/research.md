# Karl Gschwind Machine Works research

Research and content notes for the static demo in `src/`.

## Content sources

The company appears to have an existing website at [gschwindmachine.com](https://www.gschwindmachine.com/). This demo uses its [home page](https://www.gschwindmachine.com/), [about page](https://www.gschwindmachine.com/about-us/), [services page](https://www.gschwindmachine.com/services/), and [contact page](https://www.gschwindmachine.com/contact-us/) for its history, capabilities, address, and phone number. The email address appears in the company's [published facilities list](https://www.gschwindmachine.com/wp-content/uploads/DEC-2018-FACILITIES-LIST-LATHE_B.pdf). Confirm business details with the company before a public launch, especially contact information and current capabilities.

The interactive capability section uses the company's published [milling information](https://www.gschwindmachine.com/services/milling/) for the 59 × 30 inch part size and Mastercam, [turning information](https://www.gschwindmachine.com/services/turning/) for the ½ inch diameter to 35 inch swing range, and [quality information](https://www.gschwindmachine.com/quality/) for CMM-generated first-article reports. These specifications should be reconfirmed with the company before launch.

The hero image was generated for this demo. It depicts an illustrative machined part and is **not** a photograph of the company's work or facility. The brushed-steel texture was also generated for this demo and is used as a visual material in the interface.

The team-photo area is deliberately labeled as a placeholder; it does not imply that a team image has been provided.

## Engraved lettering effect

Real CNC engraving follows the geometry of the letters with a pointed cutter, rather than wiping a rectangle across them. Autodesk's [Fusion engraving guide](https://help.autodesk.com/cloudhelp/ENU/Fusion-CAM/files/2D-ENGRAVE-STEPS.htm) describes selecting text contours for an engrave toolpath, and its [centerline note](https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/How-to-cut-the-center-line-of-the-letters-in-Fusion-360-Manufacturing.html) describes following the center of text with a V-bit. The site uses a deliberately stylized single pass: a narrow bright edge crosses the lettering while the old name fades and the next is revealed. The dark letter face and light lower edge suggest a recessed cut without claiming to simulate the shop's actual machining process.

The implementation uses animated CSS [`clip-path: inset()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Masking/Clipping) for the reveal and an [`animationiteration` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationiteration_event) to advance through the published industry names. The pass is confined to the width of the longest name so the cutting edge stays near the letters. The original list remains in the document for assistive technology; reduced-motion visitors see that static list instead.
