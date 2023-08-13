'use client'
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { client } from '../../../../sanity/lib/client';
import { Post } from '../../../../sanity/lib/interface';
import { urlFor } from "../../../../sanity/lib/image"

async function getData() {
  const query = `*[_type=="post"&&categories[0]._ref=='9cd8f737-ab74-4f36-ad73-7491ed839271']{
    _id,
    title,
    slug,
    _createdAt,
    mainImage,
    author->{
      name,
      image,
    },
    description,
    body,
    categories[0]->{
      categoryTitle,
    },
}`;

  const querySide = `*[_type=="post"&&categories[0]._ref=='e6ee5d0a-fc4d-42e3-991a-f746a3eb18f2']{
    _id,
    title,
    slug,
    _createdAt,
    mainImage,
    author->{
      name,
      image,
    },
    description,
    body,
    categories[0]->{
      categoryTitle,
    },
}`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
    const data = await getData() as Post[];
    const sortedData = data.sort((a, b) => { 
        return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
    });
    const latestPosts = sortedData.slice(0, 1);
    const highlightPosts = sortedData.slice(1, 3);
    const restPosts = sortedData.slice(3);
    return (

      <div className='flex flex-row justify-start lg:justify-center'>
        <div className='px-4 sm:py-4 md:px-16 lg:px-30 divide-y divide-gray-400'>
          <div>
            <h1 className='px-4 py-4 font-bold text-[26px] text-blue-400'>All Newest Posts</h1>
          </div>
          <div className='flex flex-row divide-y-reverse divide-gray-400'>
              <ul className='px-4 py-4'>
                {latestPosts.map((post) => (
                  <li key={post._id}>
                    <article className='max-w-[400px]'>
                      <Link 
                        href={`/${post.slug.current}`}
                        prefetch
                      >
                        <div>
                          <div className="pt-8 pb-4 sm:pr-4 md:pr-16 lg:pr-24 xl:pr-32">
                              <Image
                                  src={urlFor(post.mainImage).url()} 
                                  alt={post.title} 
                                  width={300}
                                  height={300}   
                                  className="item-center rounded-lg w-[300px] h-[300px]"           
                              />
                          </div>
                        </div>
                        <div>
                          <h2 className='text-justify'>
                            {post.title}
                          </h2>
                          <p className='text-justify'>
                            {post.description}
                          </p>
                          <p className='text-justify'>
                            {post.author.name}
                          </p>
                          <p>
                            {new Date(post._createdAt).toISOString().split('T')[0]}
                          </p>
                        </div>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
              <ul className='grid grid-rows-2 pl-4 py-4 divide-y divide-gray-400'>
                {highlightPosts.map((post) => (
                  <li key={post._id}>
                    <article>
                      <Link 
                        href={`/${post.slug.current}`}
                        prefetch
                        className='divide-y-2'
                      >
                        <div className='py-4 grid grid-cols-2'>
                          <div className="pt-8 pr-2 sm:pr-4 md:pr-8 lg:pr-16 xl:pr-20">
                              <Image
                                  src={urlFor(post.mainImage).url()} 
                                  alt={post.title} 
                                  width={180}
                                  height={180}   
                                  className="item-center rounded-lg w-[180px] h-[180px]"           
                              />
                          </div>
                          <div className='pt-12'>
                              <h2>
                                {post.title}
                              </h2>
                              <p>
                                {post.author.name}
                              </p>
                              <p>
                                {post.description}
                              </p>
                              <p>
                                {new Date(post._createdAt).toISOString().split('T')[0]}
                              </p>
                          </div>
                        </div>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
            <ul className='divide-y divide-gray-400'>
              {restPosts.map((post) => (
                <li key={post._id}>
                  <article>
                    <Link 
                      href={`/${post.slug.current}`}
                      prefetch
                    >
                      <div className='flex flex-row py-4'>
                        <div className="pt-8 sm:pr-4 md:pr-8 lg:pr-16 xl:pr-20">
                            <Image
                                src={urlFor(post.mainImage).url()} 
                                alt={post.title} 
                                width={180}
                                height={180}   
                                className="item-center rounded-lg"           
                            />
                        </div>
                        <div className='flex flex-col pt-12 justify-start'>
                          <div>
                            <h2>
                              {post.title}
                            </h2>
                            <p>
                              {post.description}
                            </p>
                            <p>
                              {post.author.name}
                            </p>
                          </div>
                          <p>
                            {new Date(post._createdAt).toISOString().split('T')[0]}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
        </div>
        <div className='px-16 pt-10 hidden lg:block'>
          Banner Ads
        </div>
    </div>

  )
}