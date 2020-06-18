import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { YMaps, Map, Clusterer, Placemark } from "../ymaps";
// import points from "./points.json";
import testPoints from './testPoints.json'
import Button from "@material-ui/core/Button";
import { addPoint } from "../redux/actions";
import { setSagaState } from '../redux/actions'
const TOKEN = 'ac85ebda-7107-4441-88aa-069cf0857ea8';
// import "../styles.css";
const mapState = {
  center: [55.751574, 37.573856],
  zoom: 9,
  behaviors: ["default", "scrollZoom"],
  coordinates: []
};
const getPointData = (
  firstName,
  lastName,
  middleName,
  birthDate,
  timeOfLost,
  clothes,
  id) => {
  console.log('name', firstName)
  return {
    balloonContentBody:
      `<address>
      <strong>${firstName} ${lastName} ${middleName}</strong>,
      <br/>
      Год рождения: ${birthDate},
      <br/>
      Дата пропажи: ${timeOfLost},
       <br/>
      Комментарии: ${clothes},
      <br/>
      Перейти в профиль,<a href="/people/${id}"> подробнее...</a>,
      </address>`,
    clusterCaption: ` <strong> ${firstName} ${lastName} ${middleName}</strong>`
  };
};
const getPointOptions = () => {
  return {
    preset: "islands#violetIcon"
  };
};
export default function MapComponent() {


  const dispatch = useDispatch();
  const [searchQuery, SetSearchQuery] = useState('')
  const obj = { type: 'SET_STATE' }

  // const useFetching = (someFetchActionCreator) => {
  //   const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSagaState())
  }, [])

  // useFetching()
  // useEffect(() => {
  //   dispatch(obj);

  // }, [])

  const handleInput = (event) => {
    SetSearchQuery(event.target.value);
  }
  const getInputValue = (event) => {
    event.preventDefault();
  }
  //poluchit' pointi
  useEffect(() => {
  }, [])
  return (
    <>
      <div className="AppMap">
        <YMaps>
          <Map state={mapState}>
            <Clusterer
              options={{
                preset: "islands#invertedVioletClusterIcons",
                groupByCoordinates: false,
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false
              }}
            >
              {/*{points.map((coordinates, idx) => {*/}
              {/*  console.log(coordinates)*/}
              {/*  return <Placemark*/}
              {/*    key={idx}*/}
              {/*    geometry={{coordinates}}*/}
              {/*    properties={getPointData(idx)}*/}
              {/*    options={getPointOptions()}*/}
              {/*  />*/}
              {/*})}*/}

              {testPoints.length > 0 && testPoints.map((objUser, idx) => {
                return <Placemark
                  key={objUser.id}
                  geometry={{ coordinates: objUser.coordinates }}
                  properties={
                    getPointData(
                      objUser.firstName,
                      objUser.lastName,
                      objUser.middleName,
                      objUser.birthDate,
                      objUser.clothes,
                      objUser.timeOfLost,
                      objUser.id
                    )}
                  options={getPointOptions()}
                />
              })}
            </Clusterer>
          </Map>
        </YMaps>
      </div>
      <form onSubmit={(event) => {
        event.preventDefault();
        dispatch(addPoint(searchQuery))
      }}>
        <input type='text' name='inputСoordinates' onChange={handleInput} />
        <Button variant="contained" color="primary" type='submit'>
          Добавить точку
        </Button>
      </form>
      {searchQuery}
    </>
  );
}
