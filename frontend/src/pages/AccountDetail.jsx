
import { useDetailsContext } from "../hooks/useDetailsContext";
import AboutPane from '../components/ui/AboutPane'
import ContactInfo from '../components/ui/ContactInfo'
import DetailsDisplay from "../components/ui/DetailsDisplay";

const AccountDetail = () => {

    const {details} = useDetailsContext()

    

    let currentUser = {}
    if(details) currentUser = details.user

    return (
        <div className="account-details page">

            <AboutPane
                header="Account Details"
                >
                <ul>
                    <li>
                        Here you can view and edit your account data.
                    </li>
                </ul>
            </AboutPane>
            

            
                {!details &&
                    <div className="error">
                        There was an error recovering your account details, please contact the store.
                    </div>
                }

                {currentUser && 
                    <DetailsDisplay currentUser={currentUser}/>
                }

            <ContactInfo/>

        </div>
    )
}

export default AccountDetail