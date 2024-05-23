import { TrashIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { IconButton, Modal } from '@mui/material'
import { deleteSlideSet } from '../../services/slideSet'
import { Button } from '../button/Button'

type Props = {
	isModalOpen: boolean
	onClose: () => void
	id: number
}

export const DeleteModal: React.FC<Props> = ({ isModalOpen, onClose, id }) => {
	return (
		<Modal open={isModalOpen} onClose={onClose}>
			<div className="bg-white flex flex-col absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 w-[90vw] md:w-[600px] overflow-hidden rounded-2xl p-6 md:p-10">
				<div className="flex justify-between items-center mb-2 md:mb-4">
					<h2 className="font-bold text-xl md:text-2xl">Foliensatz löschen?</h2>
					<IconButton onClick={onClose}>
						<XMarkIcon className="w-6 h-6 fill-black" />
					</IconButton>
				</div>
				<p className="mb-2 md:mb-4">Sind Sie sich sicher das sie den Foliensatz löschen möchten? Der Foliensatz wird unwideruflich gelöscht?</p>
				<div className="flex flex-col md:flex-row justify-between">
					<Button kind="tertiary" onClick={onClose} type="button" color="gray">
						Abbrechen
					</Button>

					<Button
						onClick={() => {
							deleteSlideSet(id)
							onClose()
						}}
						Icon={TrashIcon}
						color="red"
					>
						Foliensatz löschen
					</Button>
				</div>
			</div>
		</Modal>
	)
}
