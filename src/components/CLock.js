	import React, { useEffect, useState } from 'react';
	import Clock from 'react-clock';
	import '../components/Clock.css';

	function Time() {
	const [value, setValue] = useState(new Date());
	
	useEffect(() => {
		const interval = setInterval(
			() => setValue(new Date()),
			1000
		);
	
		return () => {
			clearInterval(interval);
			
		}
	}, []);
	
	return (
		<div>
			<Clock value={value} />
		</div>
	)
	}

	export default Time;