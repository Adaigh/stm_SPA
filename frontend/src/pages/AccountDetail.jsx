
import AboutPane from '../components/ui/AboutPane'
import ContactInfo from '../components/ui/ContactInfo'
import DetailsDisplay from "../components/ui/DetailsDisplay";

import { useDetailsContext } from "../hooks/useDetailsContext";

const AccountDetail = () => {

    const {details} = useDetailsContext()

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

                {details && 
                    <DetailsDisplay/>
                }

            <ContactInfo/>

        </div>
    )
}

export default AccountDetail