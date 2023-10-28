import S from "../Home/home.module.css"
import coffeLogo from '../../assets/Imagem.png'
import cart from '../../assets/cartBuy.svg'
import clock from '../../assets/clock.svg'
import embalagem from '../../assets/box.svg'
import coffeSvg from '../../assets/coffeLogo.svg'
import CoffeList from "../../components/CoffeList/CoffeList"

function Home() {
return (
      <>
      <section className={S["section-information"]}>
         <section className={S["section-information-1"]}>
            <div className={S["header-content-section"]}>
               <h1 className={S["title-information"]}>Encontre o café perfeito para qualquer  <br />hora do dia</h1>
                <p className={S["description"]}>
                   Com o Coffee Delivery você recebe seu café onde estiver, a <br />qualquer hora
                </p>
            </div>
           <section className={S["section-svg"]}>
               <div style={{padding: '10px'}}>
              <div className={S["container-text-svg"]} >
                 <img className={S["svg-style-information"]} style={{ backgroundColor: '#C47F17'}} src={cart}  />
                 <p className={S["text-svg"]}>Compra simples e segura</p>
              </div>

              <div className={S["container-text-svg"]} >
                 < img className={S["svg-style-information"]} style={{ backgroundColor: '#DBAC2C'}} src={clock}  />
                 <p className={S["text-svg"]}>Entrega rápida e rastreada</p>
               </div>
             </div>
             <div >
               <div className={S["container-text-svg"]} >
               <img className={S["svg-style-information"]} style={{ backgroundColor: '#574F4D'}}src={embalagem} />
               <p className={S["text-svg"]}>Embalagem mantém o café intacto</p>
               </div>
               
               <div className={S["container-text-svg"]} >
               < img className={S["svg-style-information"]} style={{ backgroundColor: '#8047F8'}} src={coffeSvg} />
               <p  className={S["text-svg"]}>O café chega fresquinho até você</p>
               </div>
            </div>
           </section>
        </section>
        <img className={S["coffe-logo"]} src={coffeLogo} alt="cofee" />
    </section>
    <CoffeList />
    </>
)
}

export default Home