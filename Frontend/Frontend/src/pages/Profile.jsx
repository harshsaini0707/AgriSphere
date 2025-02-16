import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '../components/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../store/UserSlice';
import { Edit, Save, User, MapPin, Mail, Calendar } from 'lucide-react';


const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState('');
  const [State, setState] = useState('');
  const [Location, setLocation] = useState('');
  const [photo, setPhoto] = useState('');
  const [age, setAge] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const[loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if(user){
          setLoading(false);
          return;
        }
        const response = await axios.get(import.meta.env.VITE_BASE_URL+'/profile', {
          withCredentials: true,
        });
        dispatch(addUser(response?.data?.data));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [dispatch]);

  const editProfile = async () => {
    try {
      if(user){
        setLoading(false);
        return;
      }
      const response = await axios.patch(
        import.meta.env.VITE_BASE_URL+"/edit/profile",
        { firstName, lastName, Location,State, age },
        { withCredentials: true }
      );
      
      //console.log("Profile updated successfully:", response.data.data);
  
    
      dispatch(addUser(response?.data?.data));
      
  
      
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
    }
  };
  

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastname(user.lastName || '');
      setState(user.State || '');
      setLocation(user.Location || '');
      setPhoto(user.profilePhoto || '');
      setAge(user.age || '');

        setLoading(false);
       
    }
  }, [user]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f766e] via-[#22c55e] to-[#4ade80]">
      <Dashboard />
      {loading ? (
          <div className="flex justify-center w-full p-8 ml-10 animate-pulse">
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-8 py-6 bg-gradient-to-r from-green-100 to-emerald-100 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <User className="w-8 h-8 text-green-700" />
                User Profile
              </h2>
              <button
                onClick={() => {
                  setIsEditing(!isEditing) 
                  editProfile()  }}
                 
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md text-green-700 border border-green-200"
              >
                  <>
                 
                    <span className="font-medium w-5 h-5" ></span>
                  </>
      
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-green-200 shadow-lg overflow-hidden">
                    
                  </div>
                </div>
              </div>

               
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg hover:bg-green-100">
                    <User className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500"></p>
                      <p className="text-lg font-semibold text-gray-800"></p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg hover:bg-green-100">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500"></p>
                      <p className="text-lg font-semibold text-gray-800"></p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg hover:bg-green-100">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500"></p>
                      <p className="text-lg font-semibold text-gray-800"></p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg hover:bg-green-100">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500"></p>
                      <p className="text-lg font-semibold text-gray-800"></p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg hover:bg-green-100">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500"></p>
                      <p className="text-lg font-semibold text-gray-800"></p>
                    </div>
                  </div>
                </div>
              
            </div>
          </div>
        </div>
      ) : (user && (
        <div className="flex justify-center w-full p-8 ml-10">
          <div className="w-full max-w-4xl bg-gray-300 rounded-xl shadow-lg overflow-hidden">
            <div className="px-8 py-6 bg-gradient-to-r from-green-100 to-emerald-100 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <User className="w-8 h-8 text-green-700" />
                User Profile
              </h2>
              <button
                onClick={() => {
                  setIsEditing(!isEditing) 
                  editProfile()  }}
                 
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md text-green-700 border border-green-200"
              >
                {isEditing ? (
                  <>
                    <Save className="w-5 h-5" />
                    <span className="font-medium" >Save Changes</span>
                  </>
                ) : (
                  <>
                    <Edit className="w-5 h-5" />
                    <span className="font-medium">Edit Profile</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-green-200 shadow-lg overflow-hidden">
                    {photo ? (
                      <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-green-100 flex items-center justify-center">
                        <User className="w-16 h-16 text-green-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg hover:bg-green-100">
                    <User className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="text-lg font-semibold text-gray-800">{firstName} {lastName}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg hover:bg-green-100">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-lg font-semibold text-gray-800">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg hover:bg-green-100">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">State</p>
                      <p className="text-lg font-semibold text-gray-800">{State}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg hover:bg-green-100">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-lg font-semibold text-gray-800">{Location}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg hover:bg-green-100">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Age</p>
                      <p className="text-lg font-semibold text-gray-800">{age}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input className="w-full px-4 py-3 border rounded-lg" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <input className="w-full px-4 py-3 border rounded-lg" value={lastName} onChange={(e) => setLastname(e.target.value)} />
                  <input className="w-full px-4 py-3 border rounded-lg" value={State} onChange={(e) => setState(e.target.value)} />
                  <input className="w-full px-4 py-3 border rounded-lg" value={Location} onChange={(e) => setLocation(e.target.value)} />
                  <input type="number" className="w-full px-4 py-3 border rounded-lg" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
