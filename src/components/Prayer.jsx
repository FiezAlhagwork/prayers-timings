/* eslint-disable react/prop-types */

//MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

//TEST IMG


const Prayer = ({preays}) => {
    return (
        <div className=' basis-full sm:basis-2/5 md:basis-[30%] lg:basis-[19%]'>
            <Card >
                {/* <CardMedia
                    sx={{ height: 140 }}
                    image={preays.image}
                    title="green iguana"
                    className=' object-contain'
                /> */}
                <div className=' h-[20%]'>
                    <img src={preays.image} alt="" className=' object-contain w-full' />
                </div>
                <CardContent className=''>
                    <Typography gutterBottom variant="h5" component="div" className=' text-center text-black font-light md:text-right' >
                        {preays.titel}
                    </Typography>
                    <Typography variant="h2" color="text.secondary" className=' text-center text-black font-extralight md:text-right'>
                        {preays.timing}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Prayer;