import Head from "next/head";

// Components
import DefaultLayout from '../components/layouts/DefaultLayout'

export default function ContactPage({ content }) {
    return (
        <div className="py-20 lg:py-32 px-def">
            <Head>
                <title>DIRTY SNOW | Contact</title>
            </Head>
        
            <div className="w-full lg:w-2/3 rich-text" dangerouslySetInnerHTML={{__html: content.contactText}}></div>
        </div>
    )
}

ContactPage.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}


export async function getStaticProps() {
    const contactDataResponse = await fetch(process.env.API_HOST, {
        method: "POST",
        headers: {
            Authorization: `Basic ${process.env.AUTH}`,
        },
        body: JSON.stringify({
            query: "page('contact')",
            select: {
                contactText: "page.contactText.kirbyText",
            },
        }),
    });

    const jsonData = await contactDataResponse.json();
    const contactPageContent = jsonData.result;

    return {
        // Passed to the page component as props
        props: {content: contactPageContent},
    };
}
