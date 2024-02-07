import React from "react";

import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HomeCard from "../component/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import CardFeature from "../component/CardFeature";
import AllProduct from "../component/AllProduct";
import FilterProduct from "../component/FilterProduct";
const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable",
    []
  );
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  const categoryList = [...new Set(productData.map((el) => el.category))];

  //fliter data display
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === filterby.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  }, [filterby]);

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          {/* <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
            />
          </div> */}

          <div className="">
            <h2 className="text-4xl md:text-7xl font-bold py-3">
              Savor the Flavor, <br></br>
              <span className="text-[#a43820]">Delivered to Your Doorstep</span>
            </h2>
            <p className="py-3 text-base ">
              Welcome to Foodie Fiesta, where we believe that culinary
              excellence should be accessible to everyone. Our mission is
              simple: to bring you the finest flavors from around the world,
              right to your doorstep. With a curated selection of gourmet
              delights and everyday essentials, we strive to elevate your dining
              experience effortlessly. Whether you're a seasoned chef or a
              passionate foodie, our diverse range of products promises to
              tantalize your taste buds and inspire your culinary adventures.
              From artisanal cheeses to exotic spices, each item is carefully
              selected to ensure freshness, quality, and, above all, flavor. So
              sit back, relax, and let us take you on a gastronomic journey
              unlike any other. Savor the flavor with Foodie Fiesta - your
              ultimate destination for epicurean delights delivered with
              convenience and care.
            </p>
            <button className="font-bold bg-yellow-500 text-slate-200 px-4 py-2 rounded-md">
              Order Now
            </button>
          </div>
        </div>
        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center"'>
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return (
                  <HomeCard key={index + "loading"} loading={"Loading..."} />
                );
              })}
        </div>
      </div>
      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "vegetable"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeature loading="Loading..." key={index + "cartLoading"} />
              ))}
        </div>
      </div>

      <AllProduct heading="Our Products"></AllProduct>
    </div>
  );
};

export default Home;
