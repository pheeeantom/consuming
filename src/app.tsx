import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import { Link, Route, Routes } from 'react-router-dom';
import { useFetchAllCategoriesQuery } from './store/services/categories';
import Spinner from './components/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Category, Item, setCategory } from './store/reducers/items';
import CategoryItem, { CategoryItemOpts } from './components/category-item';
import List from './components/list';
import { itemsAPI, useFetchCatItemsQuery } from './store/services/items';
import GoodItem from './components/good-item';
import { addToBasket, removeFromBasket } from './store/reducers/basket';
import Sum from './components/sum';

function App() {

    console.log("App");

    const first = useRef(true);
    const prevActiveCat = useRef(null);

    //const cats = useSelector((state) => (state as any).itemsReducer.cats);

    const select = useSelector((state) => ({
        cat: (state as any).itemsReducer.cat,
        basket: (state as any).basketReducer.items,
        sum: (state as any).basketReducer.sum,
    }));

    const {data: dataCats, error: errorCats, isLoading: isLoadingCats} = useFetchAllCategoriesQuery();
    console.log("cats:", dataCats, errorCats, isLoadingCats);

    const {data: dataItems, error: errorItems, isLoading: isLoadingItems} = useFetchCatItemsQuery(select.cat, {
        skip: !select.cat
    });
    console.log("items:", dataItems, errorItems, isLoadingItems);

    const dispatch = useDispatch();

    /*useEffect(() => {
        console.log(100000);
        dispatch(setCategories(data));
    }, [data]);*/

    useEffect(() => {
        console.log(first.current, dataCats);
        if (dataCats && first.current) {
            first.current = false;
            dispatch(setCategory(dataCats[0].id));
        }
    }, [dataCats]);

    useEffect(() => {
        console.log('hi');
        prevActiveCat.current = Object.assign([], dataCats).map(item => ({id: item.id, active: select.cat === item.id}));
    }, [select.cat]);

    const callbacks = {
        changeCategory: useCallback((id: number) => {
            dispatch(setCategory(id));
        }, [dispatch]),
        addToBasket: useCallback((id: number) => {
            //console.log(dataItems);
            dispatch(addToBasket([id, Object.assign([], dataItems).find(item => {
                return item.id === id;
            }).price]));
        }, [dispatch, dataItems]),
        removeFromBasket: useCallback((id: number) => dispatch(removeFromBasket([id, Object.assign([], dataItems).find(item => {
            return item.id === id;
        }).price])), [dispatch, dataItems]),
    };

    /*const callbacks = {
        changeCategory: useCallback((id: number) => {
            console.log('changeCategory');
            console.log('data', cats);
            let newData = [...cats, { "id": 1000, "name": "yoohoo" }, { "id": 1001, "name": "yoohoo" }, { "id": 1002, "name": "yoohoo" }];
            dispatch(setCategories(newData));
            console.log(newData);
        }, [dispatch, cats]),
    };*/

    const renders = {
        cat: useCallback((item: Category, options: CategoryItemOpts) => (
          <CategoryItem key={item.id} options={options} item={item} onChange={callbacks.changeCategory}/>
        ), [callbacks.changeCategory]),
        good: useCallback((item: Item, options: null) => (
            <GoodItem key={item.id} item={item} onAdd={callbacks.addToBasket} onClear={callbacks.removeFromBasket}
                options={options}/>
        ), [callbacks.addToBasket, callbacks.removeFromBasket]),
    };

    //console.log(changedCat);

    return (
        <Routes>
            <Route path={"/"} element={
                <PageLayout>
                    <Head title='Consuming Calculator'/>
                    <Spinner active={isLoadingCats || isLoadingItems || !select.cat}>
                        <>
                            <div>
                                {
                                    errorCats ? <div>{errorCats.message}</div> :
                                        <List list={dataCats} render={renders.cat} direction={'horizontal'} options={prevActiveCat.current}/>
                                }
                            </div>
                            <div>
                                {
                                    errorItems ? <div>{errorItems.message}</div> :
                                        <List list={dataItems} render={renders.good} direction={'vertical'} options={select.basket}/>
                                }
                            </div>
                            <Sum sum={select.sum}/>
                        </>
                    </Spinner>
                </PageLayout>
            }/>
        </Routes>
    );
}

export default React.memo(App);