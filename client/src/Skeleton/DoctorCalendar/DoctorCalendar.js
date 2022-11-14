import React from 'react'
import ContentLoader from 'react-content-loader'

const DoctorCalendar = props => (
  <ContentLoader
    width={500}
    height={200}
    viewBox={`0 0 500 200`}
    backgroundColor="#f5f5f5"
    foregroundColor="#dbdbdb"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="120" height="36" />
    <rect x="0" y="50" rx="3" ry="3" width="120" height="36" />
    <rect x="130" y="0" rx="3" ry="3" width="120" height="36" />
    <rect x="130" y="50" rx="3" ry="3" width="120" height="36" />
    <rect x="260" y="0" rx="3" ry="3" width="120" height="36" />
    <rect x="260" y="50" rx="3" ry="3" width="120" height="36" />
    <rect x="390" y="0" rx="3" ry="3" width="120" height="36" />
    <rect x="390" y="50" rx="3" ry="3" width="120" height="36" />
    <rect x="0" y="100" rx="3" ry="3" width="530" height="10" />
    <rect x="0" y="125" rx="3" ry="3" width="530" height="10" />
    
  </ContentLoader>
)

export default DoctorCalendar