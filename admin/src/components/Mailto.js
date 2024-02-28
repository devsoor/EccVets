export const Mailto = ({ email, subject, body, ...props }) => {
	return (
		<a href={`mailto:${email}?subject=${subject || ''}&body=${body || ''}`} style={{ textDecoration: 'underline' }}>
			{props.children}
		</a>
	);
};