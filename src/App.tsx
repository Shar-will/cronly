import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LabHome } from './lab/LabHome'
import { labs } from './lab/registry'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LabHome />} />
        {labs.map((lab) => (
          <Route key={lab.id} path={lab.path} element={<lab.Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
