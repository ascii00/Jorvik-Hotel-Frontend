<template>
  <GoogleMap api-key="AIzaSyANjF-769MxRPUJFCwBcIeoSRhdWmr2uiA" style="width: 100%; height: 500px " :center="center" :zoom="14">

    <Marker :options="markerOptions1">
      <InfoWindow>
        <div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">Jorvik Hotel</h1>
          <h3 id="secondHeading" class="secondHeading">645 Rue De Bellecote, Courchevel, France</h3>
        </div>
      </InfoWindow>
    </Marker>

    <Marker :options="markerOptions2">
      <InfoWindow>
        <div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">Fictionville Art Museum</h1>
          <h3 id="secondHeading" class="secondHeading">129 Main St, Downtown, Fictionville, 12345</h3>
          <br>
          <div id="bodyContent">
            <p>
              Founded in 1901, this museum boasts a rich collection of contemporary and classical art. Visit to explore
              timeless pieces from the Renaissance to modern art installations.
            </p>
          </div>
        </div>
      </InfoWindow>
    </Marker>

    <Marker :options="markerOptions3">
      <InfoWindow>
        <div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">City Central Mall</h1>
          <h3 id="secondHeading" class="secondHeading">140 Market Ave, Downtown, Fictionville, 12347</h3>
          <br>
          <div id="bodyContent">
            <p>
              The largest shopping hub in Fictionville, featuring over 250 stores, a food court, and a cinema complex.
            </p>
          </div>
        </div>
      </InfoWindow>
    </Marker>

    <Marker :options="markerOptions4">
      <InfoWindow>
        <div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">Central Station</h1>
          <h3 id="secondHeading" class="secondHeading">130 Transport Blvd, Downtown, Fictionville, 12349</h3>
          <br>
          <div id="bodyContent">
            <p>
              The city's main transportation hub with connections to buses, subways, and regional trains.
            </p>
          </div>
        </div>
      </InfoWindow>
    </Marker>

    <Marker :options="markerOptions5">
      <InfoWindow>
        <div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">Riverside Park</h1>
          <h3 id="secondHeading" class="secondHeading">155 Park Ave, Downtown, Fictionville, 12352</h3>
          <br>
          <div id="bodyContent">
            <p>
              A large urban park along the river, perfect for jogging, boating, and hosting various city festivals.
            </p>
          </div>
        </div>
      </InfoWindow>
    </Marker>

    <Marker :options="markerOptions6">
      <InfoWindow>
        <div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">The Brasserie Bistro</h1>
          <h3 id="secondHeading" class="secondHeading">127 Main St, Downtown, Fictionville, 12356</h3>
          <br>
          <div id="bodyContent">
            <p>
              A chic French bistro offering classic dishes like Coq au Vin and Croque Monsieur. Don't miss their
              weekend brunch with freshly baked pastries.
            </p>
          </div>
        </div>
      </InfoWindow>
    </Marker>

    <Marker :options="markerOptions7">
      <InfoWindow>
        <div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">Mama Maria's Italian Kitchen</h1>
          <h3 id="secondHeading" class="secondHeading">133 Pasta Ln, Downtown, Fictionville, 12357</h3>
          <br>
          <div id="bodyContent">
            <p>
              Authentic Italian cuisine served in a warm, family-friendly setting. Famous for their wood-fired
              pizzas and hand-rolled pasta
            </p>
          </div>
        </div>
      </InfoWindow>
    </Marker>

    <Marker :options="markerOptions8">
      <InfoWindow>
        <div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">Agave & Lime</h1>
          <h3 id="secondHeading" class="secondHeading">136 Fiesta Rd, Downtown, Fictionville, 12360</h3>
          <br>
          <div id="bodyContent">
            <p>
              A contemporary Mexican eatery with a vibrant atmosphere. Enjoy their range of tacos, burritos,
              and a tequila bar.
            </p>
          </div>
        </div>
      </InfoWindow>
    </Marker>

  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Marker, InfoWindow },
  setup() {
    const center = { lat: 49.300862212224, lng: 19.91135153245024 };
    const markerOptions1 = {
      position: { lat: 49.300862212224, lng: 19.91135153245024 },
      title: "JORVIK HOTEL",
      icon : {
        url: "https://i.imgur.com/wt6iOWV.png",
        scaledSize: { width: 30, height: 30 },
      },
    };

    const markerOptions2 = {
      position: { lat: 49.30038410537771, lng: 19.892382029262347 },
      title: "Fictionville Art Museum",
      icon : {
        url: "https://i.imgur.com/ti4bQ4G.png",
        scaledSize: { width: 30, height: 30 },
      },
    };

    const markerOptions3 = {
      position: { lat: 49.29681124310511, lng: 19.90601926611972 },
      title: "City Central Mall",
      icon : {
        url: "https://i.imgur.com/KDJIit2.png",
        scaledSize: { width: 30, height: 30 },
      },
    };

    const markerOptions4 = {
      position: { lat: 49.298522059328484, lng: 19.942405214308998 },
      title: "Central Station",
      icon : {
        url: "https://i.imgur.com/pgBCORw.png",
        scaledSize: { width: 30, height: 30 },
      },
    };

    const markerOptions5 = {
      position: { lat: 49.311093539414934, lng: 19.927994969797957 },
      title: "Riverside Park",
      icon : {
        url: "https://i.imgur.com/A96xRxn.png",
        scaledSize: { width: 30, height: 30 },
      },
    };

    const markerOptions6 = {
      position: { lat: 49.300424721629525, lng: 19.921067477148064 },
      title: "The Brasserie Bistro",
      icon : {
        url: "https://i.imgur.com/ZtDkw4C.png",
        scaledSize: { width: 30, height: 30 },
      },
    };

    const markerOptions7 = {
      position: { lat: 49.295579321462235, lng: 19.90260948991153 },
      title: "Mama Maria's Italian Kitchen",
      icon : {
        url: "https://i.imgur.com/ZtDkw4C.png",
        scaledSize: { width: 30, height: 30 },
      },
    };

    const markerOptions8 = {
      position: { lat: 49.294369812864346, lng: 19.914274170570508 },
      title: "Agave & Lime",
      icon : {
        url: "https://i.imgur.com/ZtDkw4C.png",
        scaledSize: { width: 30, height: 30 },
      },
    };


    return {
      center,
      markerOptions1,
      markerOptions2,
      markerOptions3,
      markerOptions4,
      markerOptions5,
      markerOptions6,
      markerOptions7,
      markerOptions8,
    };
  },
});
</script>



