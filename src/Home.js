import React,{Component} from 'react';
import { variables } from './Variables';
import './site.css'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            moviesList:[],
            movie1:'',
            bgImage:'',
            overview:'',
            page:1,
            //watched:[]
        }
    }

    // handleAddNumber = () => {
    //     const newNumber = Math.random(); // Replace with your logic to generate a number
    //     this.props.addNumberToArray(newNumber);
    //   };

    async componentDidMount(){
        await this.refreshList(1);
        //this.refreshList(1);
        // const xc = this.state.moviesList[1];
        // console.log( xc.original_title);
    }

    //Refresh data from API
    async refreshList(page){

        try {
            
        const response = await fetch(variables.API_URL+"?language=en-US&page="+page+"&api_key=ebcfb0277eec8adca4b2a4d1e7652134");
        const movies = await response.json();
        this.setState({moviesList:movies.results})
        //console.log(this.state.moviesList)
        //console.log(movies.results[1].original_title);
        this.setState({page:page})

      //////////////////////Get random number to get header page
        let num = Math.floor(Math.random() * 20) + 1;
       // console.log(number)
       num == null?num =1: num = num

        this.setState({movie1:movies.results[num].original_title})
        this.setState({bgImage:'https://image.tmdb.org/t/p/original'+movies.results[num].backdrop_path})
        this.setState({overview:movies.results[num].overview})


            if (!response.ok) {
              throw Error(response.statusText);
            }
          } catch (error) {
            //console.log(error);
          }
        // if(page == null){
        //     page = 1
        // }
        // fetch(variables.API_URL+"?language=en-US&page=1&api_key=ebcfb0277eec8adca4b2a4d1e7652134")
        // .then(response=>response.json())
        // .then(data=>{
        //     this.setState({moviesList:data.results});
        //    console.log(this.state.moviesList[1])
        //    const jso = this.state.moviesList[1];
           
        //    //
           
        //   // const obj = JSON.stringify(jso);
        //    console.log(" obj.original_title");
        // })
        
    }

    // changeLanguage = (event)=>{
    //     //console.log(event.target.value);
    //     const nextVal = this.state.watched.length + 1;
    //     this.state.watched.push(nextVal);
    //     //console.log(this.state.watched);
    // } 

    render(){
        const{
            moviesList,
            movie1,
            bgImage,
            overview,
            page,
            //watched
        } = this.state;
        //this handles pagination to refresh the content
        const handleChange = (event, value) => {
            //console.log(value)
            this.refreshList(value)
        };

        const changeLanguage = (event)=>{

            const selectedOption = event.target.options[event.target.selectedIndex];
            //console.log(selectedOption.value);
            console.log(selectedOption.text);
            // const nextVal = watched.length + 1;
            // watched.push(nextVal);
            var moviesSelected = moviesList.filter(mov =>{
                //console.log(event.target.text);
                return mov.id == event.target.value;
            });
            //console.log(moviesSelected);

            moviesSelected.map(movi=>{

                if(selectedOption.text.includes("Watched")){
                    this.props.addNumberToArray(movi);
                    console.log("Watched");
                }else{
                    this.props.addToWillWatch(movi);
                    console.log("willch");
                }
                // var cont = {
                //     id : movi.id,
                //     name:
                // }
                //console.log(movi);
                
                
            });
            

            
            //console.log(this.props.numberArray);

            
        }
        

        const externalImage =bgImage;

        // const addItem = () => {
        //     const nextVal = watched.length + 1;
        //     watched.push(nextVal)
        //   };
        
    
        return(
            <>
                <div style={{height:"600px",width:"100%"}}>
                    <div className='landingImage' style={{backgroundImage: `url(${externalImage})`,
                backgroundSize: 'cover',
                opacity:"1",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',}}>
                        <div style={{textAlign:"left"}}>
                            <span style={{color:"white",fontSize:"50px"}}>{movie1}</span><br/>
                            <span style={{color:"white",fontSize:"18px"}}>{overview}</span>
                            </div>
                        <div style={{color:"white",fontSize:"13px"}}></div>
                    </div>
                </div>
                <div className='row' style={{marginTop: '10px'}}>
                  
                {
                // JSON.stringify(moviesList[1])
                }{
                
                }
                
                {moviesList.map(movie=>
                    <div key={movie.id} className='col-sm-2'>
                        <img width={220} src={"https://image.tmdb.org/t/p/w780" + movie.poster_path}/><br/>
                        <b style={{color:"#ffcfb8"}}>{movie.original_title}</b>
                        <p style={{color:"rgb(155, 155, 155)"}}>Released: {movie.release_date}</p>
                        <select className="form-select" aria-label="Default select example" onChange={changeLanguage}>
                        <option value={movie.id}>Now Watching</option>
                        <option value={movie.id}>Watched</option>
                        <option value={movie.id}>Will Watch</option> 
                        </select>
                    </div>

                    )

                }
            </div>
            {/*Add paging from material UI and pass in page whenever it is clicked */}
            <Stack spacing={2} style={{margin:'10px'}}>
                <Typography>Page: {page}</Typography>
                <Pagination count={10} page={page} onChange={handleChange} color="secondary" />
            </Stack>
            </>
        )
    }
}