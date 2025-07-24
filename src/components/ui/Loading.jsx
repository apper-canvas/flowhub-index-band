import { motion } from "framer-motion";

const Loading = ({ type = "kanban" }) => {
  if (type === "kanban") {
    return (
      <div className="flex gap-6 p-6 overflow-x-auto custom-scrollbar">
        {[1, 2, 3, 4].map((column) => (
          <div key={column} className="flex-shrink-0 w-80">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 shimmer-bg"></div>
                <div className="h-6 w-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shimmer-bg"></div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((card) => (
                  <motion.div
                    key={card}
                    className="bg-gray-50 rounded-lg p-4 shimmer-bg"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: card * 0.2 }}
                  >
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 shimmer-bg"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-3 w-3/4 shimmer-bg"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shimmer-bg"></div>
                      <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shimmer-bg"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "dashboard") {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((card) => (
            <motion.div
              key={card}
              className="bg-white rounded-xl shadow-lg p-6 shimmer-bg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: card * 0.1 }}
            >
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 shimmer-bg"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 shimmer-bg"></div>
            </motion.div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4 w-1/4 shimmer-bg"></div>
          <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer-bg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="flex space-x-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {[1, 2, 3].map((dot) => (
          <motion.div
            key={dot}
            className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.2 }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loading;