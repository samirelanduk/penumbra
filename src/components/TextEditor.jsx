import { useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { Editable } from "slate-react";
import { PreviewContext, SettingsContext } from "@/contexts";
import Paragraph from "./Paragraph";
import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import Blockquote from "./Blockquote";
import OrderedList from "./OrderedList";
import UnorderedList from "./UnorderedList";
import ListItem from "./ListItem";
import Code from "./Code";
import CodeLine from "./CodeLine";
import { Inter, Kanit, Merriweather, Mulish, Playfair_Display, Roboto_Slab } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
  weight: ["400", "700"]
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "700"]
})

const kanit = Kanit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kanit",
  weight: ["400", "700"]
})


const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-merriweather",
  weight: ["400", "700"]
})

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-slab",
  weight: ["400", "700"]
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
  weight: ["400", "700"]
})

const TextEditor = props => {

  const { document } = props;

  const preview = useContext(PreviewContext);

  const [settings,] = useContext(SettingsContext);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case "h1": return <H1 {...props} />
      case "h2": return <H2 {...props} />
      case "h3": return <H3 {...props} />
      case "blockquote": return <Blockquote {...props} />
      case "ol": return <OrderedList {...props} />
      case "ul": return <UnorderedList {...props} />
      case "li": return <ListItem {...props} />
      case "code": return <Code {...props} />
      case "codeline": return <CodeLine {...props} />
      default: return <Paragraph {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => {
    const boldClass = props.leaf.bold ? "font-bold" : "";
    const italicsClass = props.leaf.italics ? "italic" : "";
    const underlineClass = props.leaf.underline ? "underline" : "";
    const strikethroughClass = props.leaf.strikethrough ? "line-through" : "";
    const className = `${boldClass} ${italicsClass} ${underlineClass} ${strikethroughClass}`;
    return (
      <span
        {...props.attributes}
        className={className}
      >
        {props.children}
      </span>
    )
  }, [])

  const previewClass = preview ? "px-4 py-4" : "px-4 py-4 md:px-[calc((100vw-738px)/2)] md:py-6 lg:px-[calc((100vw-800px)/2)] lg:py-8 lg:prose-h1:mb-8 lg:prose-h2:mb-6"

  const proseClass = {
    large: "prose prose-lg lg:prose-2xl prose-p:my-5 prose-p:my-6",
    medium: "prose lg:prose-xl prose-p:my-4 prose-p:my-5",
    small: "prose prose-sm lg:prose-base prose-p:my-3 prose-p:my-4",
  }[document.settings.textSize || settings.textSize];

  const fontClass = {
    Mulish: `${mulish.variable} font-mulish`,
    Merriweather: `${merriweather.variable} font-merriweather`,
    "Roboto Slab": `${robotoSlab.variable} font-robotoslab`,
    Inter: `${inter.variable} font-inter`,
    "Playfair Display": `${playfairDisplay.variable} font-playfairdisplay`,
    Kanit: `${kanit.variable} font-kanit`,
  }[document.settings.font || settings.font];

  const fullProseClass = `${proseClass} prose-h1:mb-0 prose-h2:mb-4 prose-h2:mt-8 prose-h3:mt-4`;

  return (
    <Editable
      autoFocus={!preview}
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      className={`flex-grow overflow-y-auto w-full block outline-none bg-inherit resize-none max-w-none dark:text-inherit ${previewClass} ${fullProseClass} ${fontClass}`}
    />
  );
};

TextEditor.propTypes = {
  document: PropTypes.object.isRequired,
};

export default TextEditor;