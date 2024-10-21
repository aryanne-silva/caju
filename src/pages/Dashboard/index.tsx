import * as S from "./styles";
import Loader from "~/components/Loader";
import Collumns from "./components/Columns";
import Modal from "~/components/Modal";
import useDashboard from './useDashboard';
import { SearchBar } from './components/Searchbar';

const DashboardPage = () => {
  const {
    isLoading, 
    isRegistrationLoading, 
    modal, 
    setModal, 
    data, 
    handleRefresh, 
    handleSearch,
    handleRegistrationDelete, 
    handleRegistrationUpdate,
    setIsLoading
  } = useDashboard()
 
  return (
    <>
      {(isLoading || isRegistrationLoading) && <Loader />}
      
      {modal && (
        <Modal.Content title={modal?.title} onClose={() => {
          setModal(null)
          setIsLoading(false)
          }
        }>
          <>
            {modal.content}
            <Modal.Footer
              message={modal.message}
              onConfirmText="Confirmar"
              onConfirmCallback={modal.onConfirmCallback}
              onCancelText="Cancelar"
              onCancelCallback={() => {
                setModal(null)
                setIsLoading(false)
                }
              }
            />
          </>
        </Modal.Content>
      )}
      <S.Container>
        <SearchBar onRefresh={handleRefresh} onSearch={handleSearch} />
        <Collumns
          registrations={data}
          onRegistrationDelete={handleRegistrationDelete}
          onRegistrationUpdate={handleRegistrationUpdate}
        />
      </S.Container>
    </>
  );
};

export default DashboardPage;
