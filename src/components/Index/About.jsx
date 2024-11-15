import React,{memo} from 'react';
import Image from 'next/image';
import { MdSecurity , MdPermMedia } from "react-icons/md";
import { FaSackDollar, FaClipboardList  } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { RiTeamFill } from "react-icons/ri";
import Aboutt from './aboutt';
import Counters from './Counters'



const About = () => {
    return (
        <main>
            <Aboutt/>
            <Counters/>
            <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">            
                
                <div className="flex lg:flex-row flex-col md:gap-14 gap-16 justify-between lg:mt-20 mt-16">
                    <div className="w-full lg:w-6/12">
                        <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-white">Notre mission</h2>
                        <p className="font-normal text-base leading-6 text-gray-600 dark:text-gray-200 mt-6 w-full lg:w-10/12 xl:w-9/12">
                            Notre mission est de rendre l’achat, la vente et la location de propriétés accessibles et sans tracas pour tous. Nous nous efforçons d’offrir un service personnalisé, en mettant l’accent sur la transparence et la confiance, pour que chaque transaction se déroule en toute sérénité.                        </p>
                        <p className="font-normal text-base leading-6 text-gray-600 dark:text-gray-200 w-full lg:w-10/12 xl:w-9/12 mt-10">
                            Nous visons à être le partenaire immobilier de choix en offrant une expertise approfondie et un accompagnement complet à chaque étape du processus. Grâce à notre connaissance du marché et à notre engagement envers l'excellence, nous nous engageons à dépasser vos attentes et à réaliser vos projets immobiliers avec succès.                        </p>
                    </div>
                    
                    <div className="w-full lg:w-6/12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12 gap-10">
                            {/* Team Card */}
                            <div className="flex p-4 shadow-md">
                                <div className="mr-6">
                                <RiTeamFill className="text-justify-center w-8 h-8 text-blue-600 " />
                                </div>
                                <div>
                                    <p className="font-bold text-xl lg:text-2xl text-gray-800 dark:text-white mb-2">Équipe</p>
                                    <p className="mt-2 font-normal text-base leading-6 text-gray-600 dark:text-gray-200">
                                        Notre équipe d'experts en immobilier est là pour vous guider à chaque étape de votre projet, assurant un service personnalisé et efficace.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Board Card */}
                            <div className="flex p-4 shadow-md">
                                <div className="mr-6">
                                <FaClipboardList className="text-justify-center w-8 h-8 text-blue-600 " />
                                </div>
                                <div>
                                    <p className="font-bold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 dark:text-white">Conseil</p>
                                    <p className="mt-2 font-normal text-base leading-6 text-gray-600 dark:text-gray-200">
                                        Recevez des conseils professionnels pour optimiser vos décisions d'achat, de vente ou de location de biens immobiliers.
                                    </p>
                                </div>
                            </div>
                            {/* Press Card */}
                            <div className="flex p-4 shadow-md">
                                <div className="mr-6">
                                <MdPermMedia className="text-justify-center w-8 h-8 text-blue-600 " />
                                </div>
                                <div>
                                    <p className="font-bold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 dark:text-white">Médias</p>
                                    <p className="mt-2 font-normal text-base leading-6 text-gray-600 dark:text-gray-200">
                                        Découvrez nos apparitions dans les médias, reflétant notre expertise et notre engagement dans le secteur immobilier.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default memo(About);
