import { Product } from '../../types';
import Image from 'next/image';
import { useRouter } from 'next/router';

// import the CSS module
import productPageStyles from '../../styles/id.module.css';
import { GetServerSideProps } from 'next';

/**
 * This file contains the code that renders the server-side version of the app
 */

interface ProductProperties {
	product: Product;
}

const ProductPage = ({ product }: ProductProperties) => {
	const router = useRouter();

	console.log(router.query);
	return (
		<>
			<h2>Product details</h2>
			<div className={productPageStyles['product-description-list']}>
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

/**
 * Takes the context from the server, from which api data can be accessed (in
 * this case, we're accessing the product id and passing it to the url endpoint)
 * @param context - Server-rendered context
 * @returns - props from the server
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
	const response = await fetch(
		`https://dummyjson.com/products/${context.query.id}`
	);
	const product = await response.json();

	return {
		props: {
			product,
		},
	};
};

export default ProductPage;
