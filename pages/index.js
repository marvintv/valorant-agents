import Head from 'next/head'
import tw from "tailwind-styled-components"
import Image from "next/image"
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://valorant-api.com/v1/agents')
  const character = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      character,
    },
  }
}

export default function Home({character}) {
  const { data } = character;



  return (
    <Container>

   
      <Head>
        <title >
          Valorant
        </title>
        <meta name="description" content="Valorant next.js app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
        <div> 
          <h1 className="justify-items-center  font-bold

          mx-auto text-center text-white drop-shadow-sm pt-5 text-2xl
          "> VALORANT CHARACTERS</h1>
        </div>
        <CharacterList >
         {/* <div>{data[0].developerName}</div> */}
          {  data.filter((v,i,a)=>a.findIndex(t=>(t.displayName===v.displayName))===i) //filter dupes
            .map(({uiud, displayName, description, displayIconSmall}) => (
              
              <Popup  key={uiud} trigger={
              <Character key={uiud}>
                  <a className="text-black-500 font-medium mb-1
">{displayName}</a>
<p></p>
                  <Image  width={100}
                        height={100}
                        src={displayIconSmall}
                        alt="Character"
                         className=""
                        ></Image>


              </Character>
           } position="bottom center">
             {/* Description of character */}
                  <div>
                    <p className="font-bold
">Description:</p>
                    {description}</div>
            </Popup>
              
            ))}
        </CharacterList>
        <Block></Block>
        <Block></Block>
    </Container>
  )
}
const Block = tw.div`
h-1/2 w-screen py-20
`
const Character = tw.div`
flex flex-col text-center hover:scale-105 transition duration-200 ease-out;
border-r-3 bg-white hover:bg-red-300 rounded-full px-10 py-7
`
const CharacterList = tw.div`
w-4/5  mx-auto
 justify-items-center  grid grid-rows-3  gap-8 px-12 pt-9
  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 

`
const Container = tw.div`
bg-slate-400 h-full w-screen
`