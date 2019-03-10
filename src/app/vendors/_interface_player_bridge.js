export class _InterfacePlayerBridge {
	static STATUS_SET = Symbol('GENERIC_STATUS_SET');
	static STATUS_STOP = Symbol('GENERIC_STATUS_STOP');
	static STATUS_ENDED = Symbol('GENERIC_STATUS_ENDED');
	static STATUS_PAUSED = Symbol('GENERIC_STATUS_PAUSED');
	static STATUS_PLAYING = Symbol('GENERIC_STATUS_PLAYING');
	static STATUS_BUFFERING = Symbol('GENERIC_STATUS_BUFFERING');

	/**
	 * Just for the vendors side
	 * @TO_BE_OVERRIDE
	 * @param {DOMElementId|string} player_hook - element where the player will be placed
	 */
	static init(player_hook) {
		ZU_IntanceMethodHelper()
	}

	/**
	 * @TO_BE_OVERRIDE
	 * @param {object|array<object>} thingToBePlayed - if busisness logic side
	 * @param {string} videoId - if vendor side
	 * @return {Promise} if vendor side
	 */
	static play(videoId) {
		return new Promise(function(resolve, reject) {
			ZU_IntanceMethodHelper()
			resolve()
		})
	}

	/**
	 * @TO_BE_OVERRIDE
	 * @param {Symbol<_InterfacePlayerBridge.STATUS_>} statusId
	 * @param {function} callback - to be executed when the player pop the statusId
	 */
	static setStatusHandler(statusId, callback) {
		ZU_IntanceMethodHelper()
	}

	/**
	 * @TO_BE_OVERRIDE
	 * @method
	 */
	static pause = ZU_IntanceMethodHelper

	/**
	 * @TO_BE_OVERRIDE
	 * @method
	 */
	static resume = ZU_IntanceMethodHelper

	/**
	 * @TO_BE_OVERRIDE
	 * @method
	 */
	static stop = ZU_IntanceMethodHelper

	/**
	 * @TO_BE_OVERRIDE
	 * @method
	 */
	static kill = ZU_IntanceMethodHelper
}
