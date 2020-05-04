import { IShoeDto } from '../../interfaces/dto/shoe.dto';
import { IShoeItemInterface } from '../../interfaces/shoe-item.interface';

export function mapShoeDtoListToShoeInterfaceList(items: IShoeDto[]): IShoeItemInterface[] {
    return items.map((item: IShoeDto) => {
        const { brand, price, title, model, mainPhoto, photos, sex, sizes } = item;

        return {
            brand,
            price,
            title,
            model,
            mainPhoto,
            photos,
            sex,
            sizes,
            size: null,
            id: null,
        };
    });
}
