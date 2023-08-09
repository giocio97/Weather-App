import { TbSquareRoundedPlus } from "react-icons/tb";
import { useAppSelector, useAppDispatch } from '../../store';
import { addCity } from '../../features/weatherSlice';


function AddCityIcon() {
    const currentCity = useAppSelector((state) => state.weather.currentCity);
  const dispatch = useAppDispatch();

    const handleAddCity = () => {
        if (currentCity) {
          dispatch(addCity(currentCity));
        }
      };
    return (
        <>
        <TbSquareRoundedPlus className='icon' onClick={handleAddCity} />
        </>
    );
};
export default AddCityIcon;