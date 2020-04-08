
var app = new Vue({
   
    el: '#app',
    data: {
    city:'',
    saa: '',
    img: '',
    wind: '',
    paikka: '',
    show: true

    },
    
    mounted(){ 
      //kun sivu ladataan, haetaan oletuksena Seinäjoen sää
      this.paikka='Seinäjoki';
      this.getCity()
   },
    methods: {
      //annetaan haettavat kaupungit pikavalinnoille
      putCity: function(button){
      this.paikka=button;
      this.getCity();
      },
        getCity: function () {
            this.show=!this.show; //vaihdetaan boolean arvo, jotta transitio toimii
            //haetaan syötetty paikkakunta ja säätiedot apista
            axios.get('https://api.openweathermap.org/data/2.5/weather?q='+this.paikka+'&units=metric&appid=fdc4dc3565706739fef5cf15c42434ff&lang=fi')
              .then(function (response) {
                app.city= response.data.name;
                app.saa = response.data.main.temp+"\u00B0";
                app.img = "https://openweathermap.org/img/wn/"+response.data.weather[0].icon+"@2x.png";
                app.wind = "Tuulen nopeus: "+response.data.wind.speed+" m/s";

              })
              .catch(function (error) {
                app.city = 'Paikkaa ei löydy!'
                app.saa = ''
                app.img = ''
                app.wind = ''

              })        
              
            }  


          }
         


    })