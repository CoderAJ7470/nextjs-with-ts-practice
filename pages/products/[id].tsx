import { Product, ProductsPackage } from '../../types';
import Image from 'next/image';

// import the CSS module
import productPageStyles from '../../styles/id.module.css';

interface ParamProperties {
	params: {
		id: string;
	};
}

interface ProductProperties {
	product: Product;
}

const ProductPage = ({ product }: ProductProperties) => {
	return (
		<>
			<h2>Product details</h2>
			<div className={productPageStyles.productDescriptionList}>
				<Image
					src={product.images && product.images[0]}
					alt={product.description || 'image not available'}
					width={'200'}
					height={'200'}
				/>
				<ul>
					<li>
						<b>Product:</b> {product.title}
					</li>
					<li>
						<b>Description:</b> {product.description}
					</li>
					<li>
						<b>Price:</b> ${product.price}
					</li>
					<li>
						<b>Rating:</b> {product.rating}
					</li>
				</ul>
			</div>
		</>
	);
};

export const getStaticPaths = async () => {
	const res = await fetch('https://dummyjson.com/products');
	const results: ProductsPackage = await res.json();

	return {
		paths: results.products.map((product) => {
			return {
				params: {
					id: String(product.id),
				},
			};
		}),
		fallback: false,
	};
};

export const getStaticProps = async ({ params }: ParamProperties) => {
	const response = await fetch(`https://dummyjson.com/products/${params.id}`);
	const product = await response.json();

	return {
		props: {
			product,
		},
	};
};

export default ProductPage;
