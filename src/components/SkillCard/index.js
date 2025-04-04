import './index.css'

const SkillCard = props => {
  const {skillsData} = props
  const {imageUrl, name} = skillsData

  return (
    <li className="skill-item">
      <img src={imageUrl} alt={name} className="skill-image" />
      <h1>{name}</h1>
    </li>
  )
}

export default SkillCard
