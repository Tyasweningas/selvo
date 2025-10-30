import { MdStarBorderPurple500 } from "react-icons/md";
export default function ProductCard() {
    return (
        <div className="flex flex-col w-[220px] h-[400px]">
            <div className="bg-black w-[200px] h-[200px] rounded-xl">
            </div>
            <div className="">
                <p>Kategori</p>
                <p className="font-bold">Nama Produk</p>
                <div className="flex flex-row">
                <MdStarBorderPurple500 size={18}/>
                <p>5.0 - 100 terjual</p>
                </div>
            </div>

        </div>
    )
}