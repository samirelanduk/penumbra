import PropTypes from "prop-types";
import { countWords } from "@/utils";
import { plainText } from "@/serialize";
import { useContext } from "react";
import { SettingsContext } from "@/contexts";

const BottomRow = props => {

  const { document } = props;

  const [{showWordCount, showCharacterCount},] = useContext(SettingsContext);

  const className = "w-full border-t h-10 flex flex-shrink-0 justify-between text-sm text-gray-500 px-4 dark:border-gray-600 dark:text-gray-400";

  if (!showCharacterCount && !showWordCount) return <div className={className} />;

  const text = plainText(document.slate);
  const charCount = text.length;
  const wordCount = showWordCount ? countWords(text) : 0;

  const charDiff = document?.name ? charCount - document.initialCharacterCount : null;
  const wordDiff = document?.name ? wordCount - document.initialWordCount : null;

  const greenClass = "text-green-700 text-xs";
  const redClass = "text-red-800 text-xs";
  const neutralClass = "text-gray-400 text-xs ml-1";
    
  return (
    <div className="w-full border-t h-10 flex flex-shrink-0 justify-between text-sm text-gray-500 px-4 dark:border-gray-600 dark:text-gray-400">
      <div className="flex items-center">
        {showCharacterCount && <div>{charCount.toLocaleString()} character{charCount === 1 ? "" : "s"} </div>}
        {showCharacterCount && showWordCount && <div className="mx-2">|</div>}
        {showWordCount && <div>{wordCount.toLocaleString()} word{wordCount === 1 ? "" : "s"}</div>}
      </div>
      <div className="flex items-center">
        {Boolean(charDiff) && showCharacterCount && (
          <div className="flex items-center">
            <div className={charDiff > 0 ? greenClass : redClass}>
              {charDiff > 0 ? "+" : ""}
              {charDiff.toLocaleString()}
            </div>
            <div className={neutralClass}>character{charDiff === 1 ? "" : "s"}</div>
          </div>
        )}
        {Boolean(charDiff) && Boolean(wordDiff) && showCharacterCount && showWordCount && <div className="mx-2 text-gray-400">|</div>}
        {Boolean(wordDiff) && showWordCount && (
          <div className="flex items-center">
            <div className={wordDiff > 0 ? greenClass : redClass}>
              {wordDiff > 0 ? "+" : ""}
              {wordDiff.toLocaleString()}
            </div>
            <div className={neutralClass}>word{wordDiff === 1 ? "" : "s"}</div>
          </div>
        )}
      </div>
    </div>
  );
};

BottomRow.propTypes = {
  document: PropTypes.object
};

export default BottomRow;