// src/components/ProfileCard.jsx
const ProfileCard = () => {
   const users = localStorage.getItem("users")
   console.log(localStorage.getItem("users"))
  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center">
      <div className="profile-image-large w-32 h-32 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-blue-50 shadow-lg mx-auto">
        JD
      </div>:
      users.role == "HR" ?
      <div className="profile-image-large w-32 h-32 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-blue-50 shadow-lg mx-auto">
        HR
      </div>:
      users.role == "ProjectManager" ?
      <div className="profile-image-large w-32 h-32 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-blue-50 shadow-lg mx-auto">
        PM
      </div>:
      <div className="profile-image-large w-32 h-32 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-blue-50 shadow-lg mx-auto">
        EM
      </div>
}
      
      <div className="profile-info">
        <h2 className="text-blue-900 text-2xl font-semibold mb-3">John Director</h2>
        <p className="text-gray-500 mb-2 flex items-center gap-2">
          <i className="fas fa-briefcase"></i> Director at KodeBloom
        </p>
        <p className="text-gray-500 mb-2 flex items-center gap-2">
          <i className="fas fa-envelope"></i> john.director@kodebloom.com
        </p>
        <p className="text-gray-500 mb-2 flex items-center gap-2">
          <i className="fas fa-phone"></i> +91 9876543210
        </p>
        <p className="text-gray-500 mb-2 flex items-center gap-2">
          <i className="fas fa-map-marker-alt"></i> Secunderabad, Telangana
        </p>
        
        <div className="profile-stats grid grid-cols-3 gap-4 mt-5">
          <div className="stat text-center py-4 bg-blue-50 rounded-xl">
            <h3 className="text-blue-900 text-2xl mb-1">47</h3>
            <p className="text-gray-500 text-sm">Employees</p>
          </div>
          <div className="stat text-center py-4 bg-blue-50 rounded-xl">
            <h3 className="text-blue-900 text-2xl mb-1">12</h3>
            <p className="text-gray-500 text-sm">Projects</p>
          </div>
          <div className="stat text-center py-4 bg-blue-50 rounded-xl">
            <h3 className="text-blue-900 text-2xl mb-1">5</h3>
            <p className="text-gray-500 text-sm">Years</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;