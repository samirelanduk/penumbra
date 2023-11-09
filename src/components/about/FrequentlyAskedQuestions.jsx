const FrequentlyAskedQuestions = () => {

  const faqs = [
    [
      {
        question: "How do I open/save my notes?",
        answer: "The menu in the top-right corner has options to open and save notes. You can save with any file extension you like - the app will know if it's a Penumbra note or not."
      },
      {
        question: "How secure are my notes?",
        answer: "The notes never leave your device and they are encrypted with the strongest encryption available. Remember that even the strongest encryption is useless if you can be compelled to give up your password however."
      },
      {
        question: "What if I lose a password?",
        answer: "There is no way to recover a lost password. You will have to delete that particular note and start again. Password managers are a good way to avoid this problem."
      }
    ],
    [
      {
        question: "How do I change the password for a note?",
        answer: "In addition to saving (which keeps the same password) you can 'save as' which treats your note as though it's being saved for the first time, and will prompt for a password."
      },
      {
        question: "How do I use this as a standalone app?",
        answer: "In the URL bar of your browser, there will be a button you can click to download the app locally. This will give you an icon in your app drawer and allow you to use Penumbra without opening a browser window."
      },
      {
        question: "How do I customise Penumbra?",
        answer: "In the settings, accessed from the menu in the top right, you can adjust the theme, font, and other settings. You can also make these settings document-specific."
      }
    ],
    [
      {
        question: "How much does Penumbra cost?",
        answer: "Penumbra is currently entirely free. In the future, there may be a paid version with additional features, but there are no immediate plans for this."
      },
      {
        question: "What can I do with the source code?",
        answer: "Penumbra has an AGPL license, which means you can use it for free for anything, host your own version, or build on it in another non-profit, open app. You may not charge for any tool built from Penumbra however."
      },
      {
        question: "How do I request features or report bugs?",
        answer: "You can raise an issue on GitHub, or contact me on Twitter - samirelanduk in both cases. Note that I may not be able to respond immediately to all requests."
      }
    ]
  ];

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{' '}
            <a
              href="https://github.com/samirelanduk/penumbra"
              className="text-gray-900 underline"
            >
              check out the GitHub repo
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

FrequentlyAskedQuestions.propTypes = {
  
};

export default FrequentlyAskedQuestions;