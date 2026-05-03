
import { useParams, Navigate } from 'react-router-dom';
import EcommerceDemo from '../components/demos/EcommerceDemo';
import TaskManagerDemo from '../components/demos/TaskManagerDemo';
import AIDashboardDemo from '../components/demos/AIDashboardDemo';

const DemoPage = () => {
  const { demoType } = useParams<{ demoType: string }>();

  const renderDemo = () => {
    switch (demoType) {
      case 'ecommerce':
        return <EcommerceDemo />;
      case 'taskmanager':
        return <TaskManagerDemo />;
      case 'aidashboard':
        return <AIDashboardDemo />;
      default:
        return <Navigate to="/" replace />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderDemo()}
    </div>
  );
};

export default DemoPage;
