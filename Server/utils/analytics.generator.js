export const generateLast12MonthsData = async (model) => {
    const last12Month = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
  
    for (let i = 11; i >= 0; i--) {
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() ,
        currentDate.getDate() - i * 28,
        1
      );
      const startDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate() -28
      );
      const count = await model.countDocuments({
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });
      const fullDate = endDate.toLocaleString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      last12Month.push({month :fullDate , count });
    }
    return { last12Month };
  };
  