import SenderInfoForm from './forms/SenderInfoForm'
import RecipientInfoForm from './forms/RecipientInfoForm'
import CompanyInfoForm from './forms/CompanyInfoForm'
import LetterContentForm from './forms/LetterContentForm'

export default function CoverLetterForm() {
  return (
    <div className="space-y-6">
      <SenderInfoForm />
      <RecipientInfoForm />
      <CompanyInfoForm />
      <LetterContentForm />
    </div>
  )
}
