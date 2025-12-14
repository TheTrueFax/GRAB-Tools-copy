import AssemblyConversion from '@/assets/AssemblyConversion';
import encoding from '@/assets/tools/encoding';
import group from '@/assets/tools/group';

import car_asm from '@/assets/gasm/car.asm?raw';

function makeCar(nodes) {
	if (nodes.length !== 2) {
		window.toast('Must have only 2 objects to make a car', 'warning');
		return;
	}

	let [car_node, wheel_node] = nodes;

	// make wheel grabbable
	encoding.traverse_node(wheel_node, (node) => {
		if (node?.levelNodeStatic) {
			node.levelNodeStatic.isGrabbable = true;
		}
	});

	// group wheel with trigger
	const wheel_position = encoding.deepClone(
		encoding.node_data(wheel_node).position,
	);
	const trigger_node = encoding.levelNodeTrigger();
	trigger_node.levelNodeTrigger.scale = { x: 0.5, y: 0.5, z: 0.5 };
	const group_node = group.groupNodes([wheel_node, trigger_node]);
	group_node.levelNodeGroup.physicsObject = true;
	group_node.levelNodeGroup.position = wheel_position;
	trigger_node.levelNodeTrigger.position = { x: 0, y: 0, z: 0 };
	encoding.node_data(car_node).position = { x: 0, y: 0, z: 0 };
	encoding.node_data(wheel_node).position = { x: 0, y: 0, z: 0 };

	// ids: [group[wheel, trigger], car, code]
	const start_id = 1;
	const group_id = start_id;
	// wheel
	const trigger_id = start_id + 2;
	const car_id = start_id + 3;
	// code

	// create code block
	const code_node = encoding.levelNodeGASM();
	code_node.levelNodeGASM.startActive = true;

	encoding.add_code_connection(code_node, 'position', 'Str', group_id);
	encoding.add_code_connection(code_node, 'rotation', 'Str', group_id);
	encoding.add_code_connection(code_node, 'position', 'Car', car_id);
	encoding.add_code_connection(code_node, 'rotation', 'Car', car_id);
	encoding.add_code_connection(code_node, 'active', 'Hol', trigger_id);

	AssemblyConversion.asm_to_json(car_asm, code_node);

	// connect trigger
	const source = encoding.triggerSourceBasic();
	source.triggerSourceBasic.type =
		encoding.load().COD.Level.TriggerSourceBasic.Type.HAND;
	trigger_node.levelNodeTrigger.triggerSources.push(source);

	trigger_node.levelNodeTrigger.shape = encoding.shapes().SPHERE;

	// result: [group[wheel, trigger], car, code]
	nodes.length = 0;
	nodes.push(group_node, car_node, code_node);
	return nodes;
}

export default {
	makeCar,
};
